import { mock } from "jest-mock-extended";
import { AuthService } from "src/modules/auth/auth.service";

export const getFreshAuthServiceMock = () => {
  const service = mock<AuthService>();
  return service;
};
