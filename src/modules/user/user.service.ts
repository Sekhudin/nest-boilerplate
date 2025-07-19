import { EntityManager } from "typeorm";
import { Injectable } from "@nestjs/common";
import { BaseService } from "src/shared/base/base.service";
import { UserEmailAlreadyUsedException } from "src/shared/exceptions/user/user-email-already-used.exception";
import { RoleService } from "src/modules/role/role.service";
import { User } from "./entities/user.entity";
import { CreateLocalUserDto } from "./dto/requests/create-local-user.dto";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService extends BaseService {
  constructor(
    private readonly roleService: RoleService,
    private readonly userRepository: UserRepository,
  ) {
    super();
  }

  async createLocalUser(createLocalUserDto: CreateLocalUserDto, entityManager?: EntityManager) {
    const repository = this.getRepository(User, this.userRepository, entityManager);
    const existingUser = await repository.findOneBy({ email: createLocalUserDto.email });
    if (existingUser) throw new UserEmailAlreadyUsedException();

    const role = await this.roleService.findOrCreateDefaultRole();
    const newUser = repository.create(createLocalUserDto);
    newUser.role = role;

    return await repository.save(newUser);
  }
}
