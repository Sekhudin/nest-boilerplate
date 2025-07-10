import { EntityManager } from "typeorm";
import { ConflictException, Injectable } from "@nestjs/common";
import { RoleService } from "src/modules/role/role.service";
import { BaseService } from "src/shared/base/base.service";
import { User } from "./entities/user.entity";
import { CreateLocalUserDto } from "./dto/create-local-user.dto";
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
    if (existingUser) throw new ConflictException();
    const role = await this.roleService.findDefaultRole();
    const user = repository.create(createLocalUserDto);
    user.role = role;
    return await repository.save(user);
  }
}
