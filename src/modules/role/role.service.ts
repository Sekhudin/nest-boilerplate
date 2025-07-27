import { EntityManager } from "typeorm";
import { Injectable } from "@nestjs/common";
import { BaseService } from "src/shared/base/base.service";
import { authConfig } from "src/config/auth.config";
import { Role } from "./entities/role.entity";
import { RoleRepository } from "./role.repository";

@Injectable()
export class RoleService extends BaseService {
  constructor(private readonly roleRepository: RoleRepository) {
    super();
  }

  async findOrCreateDefaultRole(entityManager?: EntityManager) {
    const repository = this.getRepository(Role, this.roleRepository, entityManager);
    const existingRole = await repository.findOneBy({ name: authConfig.DEFAULT_ROLE });
    if (existingRole) return existingRole;

    const role = repository.create({ name: authConfig.DEFAULT_ROLE, description: "default role" });
    return await repository.save(role);
  }
}
