import { mock } from "jest-mock-extended";
import { UserAuthRepository } from "src/modules/auth/repositories/user-auth.repository";

export const getFreshUserAuthRepositoryMock = () => {
  const repository = mock<UserAuthRepository>();
  return repository;
};
