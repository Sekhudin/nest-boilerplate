import { EntityManager } from "typeorm";
import { Injectable } from "@nestjs/common";
import { BaseService } from "src/shared/base/base.service";
import { UserAuthenticationFailedException } from "src/shared/exceptions/user/user-authentication-failed.exception";
import { UserEmailAlreadyUsedException } from "src/shared/exceptions/user/user-email-already-used.exception";
import { UserEmailNotVerifiedException } from "src/shared/exceptions/user/user-email-not-verified.exception";
import { UserInactiveException } from "src/shared/exceptions/user/user-inactive.exception";
import { User } from "./entities/user.entity";
import { CreateLocalUserDto } from "./dto/requests/create-local-user.dto";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService extends BaseService {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  async createLocalUser({ email, role }: CreateLocalUserDto, entityManager?: EntityManager) {
    const repository = this.getRepository(User, this.userRepository, entityManager);
    const existingUser = await repository.findOneBy({ email });
    if (existingUser) throw new UserEmailAlreadyUsedException();

    const newUser = repository.create({ email, role });
    return await repository.save(newUser);
  }

  markEmailIsVerified(user: User, entityManager?: EntityManager) {
    const repository = this.getRepository(User, this.userRepository, entityManager);
    user.isActive = true;
    user.isEmailVerified = true;
    return repository.save(user);
  }

  async findRegisteredUserOrThrow(email: string, entityManager?: EntityManager) {
    const repository = this.getRepository(User, this.userRepository, entityManager);
    const registeredUser = await repository
      .findOneOrFail({ where: { email }, relations: { authMethod: true, role: true } })
      .catch(() => {
        throw new UserAuthenticationFailedException();
      });

    if (!registeredUser.isActive) {
      throw new UserInactiveException();
    }

    if (!registeredUser.isEmailVerified) {
      throw new UserEmailNotVerifiedException();
    }

    return registeredUser;
  }
}
