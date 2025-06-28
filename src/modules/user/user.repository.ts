import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(User, repo.manager, repo.queryRunner);
  }
}
