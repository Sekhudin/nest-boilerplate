import { mock } from "jest-mock-extended";
import { AuthService } from "src/modules/auth/auth.service";

export const getFreshAuthServiceMock = () => {
  const service = mock<AuthService>();

  service.signUpLocal.mockResolvedValue({ code: "123456", expiresAt: new Date(), expiresInMinutes: 5 });
  return service;
};
