import { EntityManager } from "typeorm";
import { Injectable } from "@nestjs/common";
import { UserAuth } from "src/modules/auth/entities/user-auth.entity";
import { UserAuthRepository } from "src/modules/auth/repositories/user-auth.repository";
import { User } from "src/modules/user/entities/user.entity";
import { CryptoService } from "src/shared/modules/global/crypto/crypto.service";
import { BaseService } from "src/shared/base/base.service";
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
    const userAuth = repository.create({ user });
    userAuth.providerUserId = user.email;
    userAuth.provider = await this.authProviderService.fidLocalAuthProvider();
    userAuth.passwordHash = await this.cryptoService.hashPassword(password);
    return await repository.save(userAuth);
  }
}
