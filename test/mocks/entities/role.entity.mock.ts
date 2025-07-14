import { mockDeep } from "jest-mock-extended";
import { Role } from "src/modules/role/entities/role.entity";

export const getFreshRoleMock = () => {
  const entity = mockDeep<Role>();
  return entity;
};
