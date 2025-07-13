import { DeepPartial } from "typeorm";
import { mock } from "jest-mock-extended";
import { UserAuth } from "src/modules/auth/entities/user-auth.entity";
import { UserAuthRepository } from "src/modules/auth/repositories/user-auth.repository";

export const getFreshUserAuthRepositoryMock = () => {
  const repository = mock<UserAuthRepository>();
  repository.save.mockImplementation(async <T extends DeepPartial<UserAuth>>(entity: T | T[]) => {
    return entity;
  });
  return repository;
};
