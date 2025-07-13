import { mock, mockDeep } from "jest-mock-extended";
import { UserAuth } from "src/modules/auth/entities/user-auth.entity";
import { UserAuthService } from "src/modules/auth/services/user-auth.service";

export const getFreshUserAuthServiceMock = () => {
  const service = mock<UserAuthService>();

  service.createLocalUserAuth.mockResolvedValue(mockDeep<UserAuth>());
  return service;
};
