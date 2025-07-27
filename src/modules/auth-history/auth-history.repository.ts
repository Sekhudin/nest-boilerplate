import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthHistory } from "./entities/auth-history.entity";

@Injectable()
export class AuthHistoryRepository extends Repository<AuthHistory> {
  constructor(@InjectRepository(AuthHistory) repo: Repository<AuthHistory>) {
    super(AuthHistory, repo.manager, repo.queryRunner);
  }
}
