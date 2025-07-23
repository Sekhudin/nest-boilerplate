import { mock } from "jest-mock-extended";
import { AuthHistoryRepository } from "src/modules/auth/repositories/auth-history.repository";

export const getFreshAuthHistoryRepositoryMock = () => {
  const repository = mock<AuthHistoryRepository>();
  return repository;
};
