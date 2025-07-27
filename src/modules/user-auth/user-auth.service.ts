import { EntityManager } from "typeorm";
import { Injectable } from "@nestjs/common";
import { BaseService } from "src/shared/base/base.service";
import { CryptoService } from "src/shared/modules/global/crypto/crypto.service";
import { UserAuth } from "./entities/user-auth.entity";
import { CreateLocalUserAuthDto } from "./dto/requests/create-local-user-auth.dto";
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
}
