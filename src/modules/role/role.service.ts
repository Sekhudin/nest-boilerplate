import { Injectable } from "@nestjs/common";
import { BaseService } from "src/shared/base/base.service";
import { authConfig } from "src/config/auth.config";
import { RoleRepository } from "./role.repository";

@Injectable()
export class RoleService extends BaseService {
  constructor(private readonly roleRepository: RoleRepository) {
    super();
  }

  async findOrCreateDefaultRole() {
    const existingRole = await this.roleRepository.findOneBy({ name: authConfig.DEFAULT_ROLE });
    if (existingRole) return existingRole;

    const role = this.roleRepository.create();
    role.name = authConfig.DEFAULT_ROLE;
    role.description = "Default Role";

    return await this.roleRepository.save(role);
  }
}
