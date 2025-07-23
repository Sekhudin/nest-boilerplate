import { mock } from "jest-mock-extended";
import { UserAuthService } from "src/modules/auth/services/user-auth.service";

export const getFreshUserAuthServiceMock = () => {
  const service = mock<UserAuthService>();
  return service;
};
