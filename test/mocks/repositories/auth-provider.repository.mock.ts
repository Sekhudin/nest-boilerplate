import { mock } from "jest-mock-extended";
import { AuthProviderRepository } from "src/modules/auth/repositories/auth-provider.repository";

export const getFreshAuthProviderRepositoryMock = () => {
  const repository = mock<AuthProviderRepository>();
  return repository;
};
