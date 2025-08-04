import { EntityManager } from "typeorm";
import { Injectable } from "@nestjs/common";
import { BaseService } from "src/shared/base/base.service";
import { ContextService } from "src/shared/modules/global/context/context.service";
import { CryptoService } from "src/shared/modules/global/crypto/crypto.service";
import { JwtTokenService } from "src/shared/modules/global/jwt-token/jwt-token.service";
import { Payload } from "src/shared/dto/payload.dto";
import { TokenInvalidException } from "src/shared/exceptions/auth/token-invalid.exception";
import { UnauthorizedException } from "src/shared/exceptions/auth/unauthorized.exception";
import { UserInactiveException } from "src/shared/exceptions/user/user-inactive.exception";
import { Token } from "./entities/token.entity";
import { UpsertAuthenticationTokenDto } from "./dto/requests/upsert-authentication-token.dto";
import { TokenRepository } from "./token.repository";

@Injectable()
export class TokenService extends BaseService {
  constructor(
    private readonly jwtTokenService: JwtTokenService,
    private readonly cryptoService: CryptoService,
    private readonly contextService: ContextService,
    private readonly tokenRepository: TokenRepository,
  ) {
    super();
  }

  async upsertAuthenticationToken({ user, provider }: UpsertAuthenticationTokenDto, entityManager?: EntityManager) {
    const repository = this.getRepository(Token, this.tokenRepository, entityManager);

    const deviceId = this.contextService.getDeviceId();
    const userAgent = this.contextService.getUserAgent();
    const existingToken = await repository.findOne({
      where: { user: { id: user.id }, deviceId },
      relations: { user: true },
    });

    const payload: Payload = {
      sub: user.id,
      deviceId,
      provider: provider.name,
      roles: user.role.map(({ name }) => name),
    };

    const authenticationToken = await this.jwtTokenService.signToken(payload);
    const hashedToken = await this.cryptoService.hashAuthToken(authenticationToken.refreshToken);
    const token: Token = existingToken ?? repository.create({ user });
    token.revoked = false;
    token.token = hashedToken;
    token.deviceId = deviceId;
    token.ipAddress = userAgent.ip;
    token.userAgentString = userAgent.userAgent;

    await repository.save(token);
    return authenticationToken;
  }

  async generateAccessTokenFromClaims(refreshToken: string, entityManager?: EntityManager) {
    const claims = this.contextService.getUser();
    if (!claims) {
      throw new UnauthorizedException();
    }

    const repository = this.getRepository(Token, this.tokenRepository, entityManager);
    const token = await repository
      .findOneOrFail({
        where: { deviceId: claims.deviceId, revoked: false, user: { id: claims.sub } },
        relations: { user: { role: true } },
      })
      .catch(() => {
        throw new TokenInvalidException();
      });

    if (!token.user.isActive) {
      throw new UserInactiveException();
    }

    const isRefreshTokenValid = await this.cryptoService.verifyAuthToken(refreshToken, token.token);
    if (!isRefreshTokenValid) {
      throw new TokenInvalidException();
    }

    const deviceId = this.contextService.getDeviceId();
    const payload: Payload = {
      sub: token.user.id,
      deviceId,
      provider: claims.provider,
      roles: token.user.role.map(({ name }) => name),
    };

    const accessToken = await this.jwtTokenService.signAccessToken(payload);
    return { token, accessToken };
  }

  async signOutAndRemoveToken(refreshToken: string, entityManager?: EntityManager) {
    const claims = this.contextService.getUser();
    if (!claims) {
      throw new UnauthorizedException();
    }

    const repository = this.getRepository(Token, this.tokenRepository, entityManager);
    const token = await repository
      .findOneOrFail({
        where: { deviceId: claims.deviceId, revoked: false, user: { id: claims.sub } },
        relations: { user: true },
      })
      .catch(() => {
        throw new TokenInvalidException();
      });

    if (!token.user.isActive) {
      throw new UserInactiveException();
    }

    const isRefreshTokenValid = await this.cryptoService.verifyAuthToken(refreshToken, token.token);
    if (!isRefreshTokenValid) {
      throw new TokenInvalidException();
    }

    await repository.remove(token);
    return token;
  }
}
