import { mock } from "jest-mock-extended";
import { AuthHistoryRepository } from "src/modules/auth-history/auth-history.repository";

export const getFreshAuthHistoryRepositoryMock = () => {
  const repository = mock<AuthHistoryRepository>();
  return repository;
};
