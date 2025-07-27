import { mock } from "jest-mock-extended";
import { AuthProviderService } from "src/modules/auth-provider/auth-provider.service";

export const getFreshAuthProviderServiceMock = () => {
  const service = mock<AuthProviderService>();
  return service;
};
