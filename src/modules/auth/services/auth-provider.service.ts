import { Injectable } from "@nestjs/common";
import { BaseService } from "src/shared/base/base.service";
import { AuthProviderRepository } from "src/modules/auth/repositories/auth-provider.repository";

@Injectable()
export class AuthProviderService extends BaseService {
  constructor(private readonly authProviderRepository: AuthProviderRepository) {
    super();
  }

  async findOrCreateLocalAuthProvider() {
    const existingAuthProvider = await this.authProviderRepository.findOneBy({ name: "LOCAL" });
    if (existingAuthProvider) return existingAuthProvider;

    const newAuthProvider = this.authProviderRepository.create({ name: "LOCAL" });
    newAuthProvider.description = "for local auth provider";

    return await this.authProviderRepository.save(newAuthProvider);
  }
}
