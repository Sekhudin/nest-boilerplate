import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthProvider } from "./entities/auth-provider.entity";

@Injectable()
export class AuthProviderRepository extends Repository<AuthProvider> {
  constructor(
    @InjectRepository(AuthProvider)
    protected repository: Repository<AuthProvider>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
