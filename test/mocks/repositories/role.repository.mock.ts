import { mock } from "jest-mock-extended";
import { RoleRepository } from "src/modules/role/role.repository";

export const getFreshRoleRepositoryMock = () => {
  const repository = mock<RoleRepository>();
  return repository;
};
