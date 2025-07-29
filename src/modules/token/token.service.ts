import { EntityManager } from "typeorm";
import { Injectable } from "@nestjs/common";
import { BaseService } from "src/shared/base/base.service";
import { ContextService } from "src/shared/modules/global/context/context.service";
import { CryptoService } from "src/shared/modules/global/crypto/crypto.service";
import { JwtTokenService } from "src/shared/modules/global/jwt-token/jwt-token.service";
import { Payload } from "src/shared/dto/payload.dto";
import { Token } from "./entities/token.entity";
import { UpsertAuthenticationTokenDto } from "./dto/upsert-authentication-token.dto";
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
      email: user.email,
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
}
