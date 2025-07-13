import { DeepPartial } from "typeorm";
import { mock } from "jest-mock-extended";
import { AuthProvider } from "src/modules/auth/entities/auth-provider.entity";
import { AuthProviderRepository } from "src/modules/auth/repositories/auth-provider.repository";

export const getFreshAuthProviderRepositoryMock = () => {
  const repository = mock<AuthProviderRepository>();
  repository.save.mockImplementation(async <T extends DeepPartial<AuthProvider>>(entity: T | T[]) => {
    return entity;
  });
  return repository;
};
