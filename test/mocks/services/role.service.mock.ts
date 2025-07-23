import { mock } from "jest-mock-extended";
import { RoleService } from "src/modules/role/role.service";

export const getFreshRoleServiceMock = () => {
  const service = mock<RoleService>();
  return service;
};
