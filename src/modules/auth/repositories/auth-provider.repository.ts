import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthProvider } from "src/modules/auth/entities/auth-provider.entity";

@Injectable()
export class AuthProviderRepository extends Repository<AuthProvider> {
  constructor(@InjectRepository(AuthProvider) repo: Repository<AuthProvider>) {
    super(AuthProvider, repo.manager, repo.queryRunner);
  }
}
