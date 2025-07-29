import { EntityManager } from "typeorm";
import { Injectable } from "@nestjs/common";
import { BaseService } from "src/shared/base/base.service";
import { ContextService } from "src/shared/modules/global/context/context.service";
import { CryptoService } from "src/shared/modules/global/crypto/crypto.service";
import { JwtTokenService } from "src/shared/modules/global/jwt-token/jwt-token.service";
import { Payload } from "src/shared/dto/payload.dto";
import { Token } from "./entities/token.entity";
import { CreateAuthenticationTokenDto } from "./dto/create-authentication-token.dto";
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

  async createAuthenticationToken({ user, provider }: CreateAuthenticationTokenDto, entityManager?: EntityManager) {
    const repository = this.getRepository(Token, this.tokenRepository, entityManager);
    const deviceId = this.contextService.getDeviceId();
    const payload: Payload = {
      sub: user.id,
      email: user.email,
      deviceId,
      provider: provider.name,
      roles: user.role.map(({ name }) => name),
    };

    const authenticationToken = await this.jwtTokenService.signToken(payload);
    const newToken = repository.create({ user, revoked: false });
    const userAgent = this.contextService.getUserAgent();
    newToken.token = await this.cryptoService.hashAuthToken(authenticationToken.refreshToken);
    newToken.deviceId = deviceId;
    newToken.ipAddress = userAgent.ip;
    newToken.userAgentString = userAgent.userAgent;
    await repository.save(newToken);
    return authenticationToken;
  }
}
