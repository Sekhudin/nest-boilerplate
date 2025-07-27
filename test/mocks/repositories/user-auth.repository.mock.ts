import { mock } from "jest-mock-extended";
import { UserAuthRepository } from "src/modules/user-auth/user-auth.repository";

export const getFreshUserAuthRepositoryMock = () => {
  const repository = mock<UserAuthRepository>();
  return repository;
};
