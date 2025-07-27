import { mockDeep } from "jest-mock-extended";
import { UserAuth } from "src/modules/user-auth/entities/user-auth.entity";

export const getFreshUserAuthMock = () => {
  const entity = mockDeep<UserAuth>();
  return entity;
};
