import { EntityManager } from "typeorm";
import { Injectable } from "@nestjs/common";
import { BaseService } from "src/shared/base/base.service";
import { UserEmailAlreadyUsedException } from "src/shared/exceptions/user/user-email-already-used.exception";
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
    user.isEmailVerified = true;
    return repository.save(user);
  }
}
