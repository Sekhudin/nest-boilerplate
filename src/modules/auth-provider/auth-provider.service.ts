import { EntityManager } from "typeorm";
import { Injectable } from "@nestjs/common";
import { BaseService } from "src/shared/base/base.service";
import { AuthProvider } from "./entities/auth-provider.entity";
import { AuthProviderRepository } from "./auth-provider.repository";

@Injectable()
export class AuthProviderService extends BaseService {
  constructor(private readonly authProviderRepository: AuthProviderRepository) {
    super();
  }

  async findOrCreateLocalAuthProvider(entityManager?: EntityManager) {
    const repository = this.getRepository(AuthProvider, this.authProviderRepository, entityManager);
    const existingAuthProvider = await repository.findOneBy({ name: "LOCAL" });
    if (existingAuthProvider) return existingAuthProvider;

    const newAuthProvider = repository.create({ name: "LOCAL" });
    newAuthProvider.description = "for local auth provider";

    return await repository.save(newAuthProvider);
  }
}
