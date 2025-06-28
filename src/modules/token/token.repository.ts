import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Token } from "./entities/token.entity";

@Injectable()
export class TokenRepository extends Repository<Token> {
  constructor(@InjectRepository(Token) repo: Repository<Token>) {
    super(Token, repo.manager, repo.queryRunner);
  }
}
