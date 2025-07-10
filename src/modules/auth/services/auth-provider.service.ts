import { Injectable } from "@nestjs/common";
import { AuthProviderRepository } from "src/modules/auth/repositories/auth-provider.repository";
import { BaseService } from "src/shared/base/base.service";

@Injectable()
export class AuthProviderService extends BaseService {
  constructor(private readonly authProviderRepository: AuthProviderRepository) {
    super();
  }

  async fidLocalAuthProvider() {
    const existingAuthProvider = await this.authProviderRepository.findOneBy({ name: "LOCAL" });
    if (existingAuthProvider) return existingAuthProvider;
    const authProvider = this.authProviderRepository.create({ name: "LOCAL" });
    authProvider.description = "for local auth provider";
    return await this.authProviderRepository.save(authProvider);
  }
}
