import { DeepPartial } from "typeorm";
import { mock } from "jest-mock-extended";
import { User } from "src/modules/user/entities/user.entity";
import { UserRepository } from "src/modules/user/user.repository";

export const getFreshUserRepositoryMock = () => {
  const repository = mock<UserRepository>();

  repository.create.mockReturnValue(mock<User>());
  repository.save.mockImplementation(async <T extends DeepPartial<User>>(entity: T | T[]) => {
    return entity;
  });
  return repository;
};
