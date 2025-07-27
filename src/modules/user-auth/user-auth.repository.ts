import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserAuth } from "./entities/user-auth.entity";

@Injectable()
export class UserAuthRepository extends Repository<UserAuth> {
  constructor(@InjectRepository(UserAuth) repo: Repository<UserAuth>) {
    super(UserAuth, repo.manager, repo.queryRunner);
  }
}
