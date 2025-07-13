import { EntityManager } from "typeorm";
import { Injectable } from "@nestjs/common";
import { BaseService } from "src/shared/base/base.service";
import { CryptoService } from "src/shared/modules/global/crypto/crypto.service";
import { UserAuth } from "src/modules/auth/entities/user-auth.entity";
import { UserAuthRepository } from "src/modules/auth/repositories/user-auth.repository";
import { User } from "src/modules/user/entities/user.entity";
import { AuthProviderService } from "./auth-provider.service";

@Injectable()
export class UserAuthService extends BaseService {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly authProviderService: AuthProviderService,
    private readonly userAuthRepository: UserAuthRepository,
  ) {
    super();
  }

  async createLocalUserAuth(user: User, password: string, entityManager?: EntityManager) {
    const repository = this.getRepository(UserAuth, this.userAuthRepository, entityManager);

    const newUserAuth = repository.create({ user });
    newUserAuth.providerUserId = user.email;
    newUserAuth.provider = await this.authProviderService.findOrCreateLocalAuthProvider();
    newUserAuth.passwordHash = await this.cryptoService.hashPassword(password);

    return await repository.save(newUserAuth);
  }
}
