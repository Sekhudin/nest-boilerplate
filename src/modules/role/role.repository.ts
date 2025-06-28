import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "./entities/role.entity";

@Injectable()
export class RoleRepository extends Repository<Role> {
  constructor(@InjectRepository(Role) repo: Repository<Role>) {
    super(Role, repo.manager, repo.queryRunner);
  }
}
