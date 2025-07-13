import { mock } from "jest-mock-extended";
import { AuthProviderService } from "src/modules/auth/services/auth-provider.service";

export const getFreshAuthProviderServiceMock = () => {
  const service = mock<AuthProviderService>();
  return service;
};
