import { mockDeep } from "jest-mock-extended";
import { AuthProvider } from "src/modules/auth-provider/entities/auth-provider.entity";

export const getFreshAuthProviderMock = () => {
  const entity = mockDeep<AuthProvider>();
  return entity;
};
