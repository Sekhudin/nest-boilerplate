import { DeepPartial } from "typeorm";
import { mock } from "jest-mock-extended";
import { Role } from "src/modules/role/entities/role.entity";
import { RoleRepository } from "src/modules/role/role.repository";

export const getFreshRoleRepositoryMock = () => {
  const repository = mock<RoleRepository>();
  repository.save.mockImplementation(async <T extends DeepPartial<Role>>(entity: T | T[]) => {
    return entity;
  });
  return repository;
};
