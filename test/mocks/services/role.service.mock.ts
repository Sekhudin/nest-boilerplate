import { mock } from "jest-mock-extended";
import { Role } from "src/modules/role/entities/role.entity";
import { RoleService } from "src/modules/role/role.service";

export const getFreshRoleServiceMock = () => {
  const service = mock<RoleService>();

  service.findOrCreateDefaultRole.mockResolvedValue(mock<Role>());
  return service;
};
