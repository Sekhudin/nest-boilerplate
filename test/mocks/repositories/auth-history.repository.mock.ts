import { DeepPartial } from "typeorm";
import { mock } from "jest-mock-extended";
import { AuthHistory } from "src/modules/auth/entities/auth-history.entity";
import { AuthHistoryRepository } from "src/modules/auth/repositories/auth-history.repository";

export const getFreshAuthHistoryRepositoryMock = () => {
  const repository = mock<AuthHistoryRepository>();

  repository.save.mockImplementation(async <T extends DeepPartial<AuthHistory>>(entity: T | T[]) => {
    return entity;
  });
  return repository;
};
