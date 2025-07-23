import { mock } from "jest-mock-extended";
import { UserRepository } from "src/modules/user/user.repository";

export const getFreshUserRepositoryMock = () => {
  const repository = mock<UserRepository>();
  return repository;
};
