import { mock } from "jest-mock-extended";
import { TokenService } from "src/modules/token/token.service";

export const getFreshTokenServiceMock = () => {
  const service = mock<TokenService>();
  return service;
};
