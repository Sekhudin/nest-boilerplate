import { EntityManager } from "typeorm";
import { Injectable } from "@nestjs/common";
import { BaseService } from "src/shared/base/base.service";
import { CryptoService } from "src/shared/modules/global/crypto/crypto.service";
import { UserAuthenticationFailedException } from "src/shared/exceptions/user/user-authentication-failed.exception";
import { UserAuth } from "./entities/user-auth.entity";
import { CreateLocalUserAuthDto } from "./dto/requests/create-local-user-auth.dto";
import { FindValidLocalUserAuthDto } from "./dto/requests/find-valid-local-user-auth.dto";
import { UserAuthRepository } from "./user-auth.repository";

@Injectable()
export class UserAuthService extends BaseService {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly userAuthRepository: UserAuthRepository,
  ) {
    super();
  }

  async createLocalUserAuth({ user, password, provider }: CreateLocalUserAuthDto, entityManager?: EntityManager) {
    const repository = this.getRepository(UserAuth, this.userAuthRepository, entityManager);

    const newUserAuth = repository.create({ user, provider });
    newUserAuth.providerUserId = user.email;
    newUserAuth.passwordHash = await this.cryptoService.hashPassword(password);

    return await repository.save(newUserAuth);
  }

  async findValidLocalUserAuthOrThrow({ user, password }: FindValidLocalUserAuthDto, entityManager?: EntityManager) {
    const repository = this.getRepository(UserAuth, this.userAuthRepository, entityManager);

    const userAuth = await repository
      .findOneOrFail({ where: { id: user.authMethod.id }, relations: { provider: true } })
      .catch(() => {
        throw new UserAuthenticationFailedException();
      });

    const isValidPassword = await this.cryptoService.verifyPassword(password, userAuth.passwordHash);
    if (!isValidPassword) throw new UserAuthenticationFailedException();
    return userAuth;
  }
}
