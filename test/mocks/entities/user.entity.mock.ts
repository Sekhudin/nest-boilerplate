import { mockDeep } from "jest-mock-extended";
import { User } from "src/modules/user/entities/user.entity";

export const getFreshUserMock = () => {
  const entity = mockDeep<User>();
  return entity;
};
