import { mockDeep } from "jest-mock-extended";
import { UserAuth } from "src/modules/auth/entities/user-auth.entity";

export const getFreshUserAuthMock = () => {
  const entity = mockDeep<UserAuth>();
  return entity;
};
