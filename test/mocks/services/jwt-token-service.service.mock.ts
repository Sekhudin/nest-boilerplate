import { mock } from "jest-mock-extended";
import { JwtTokenService } from "src/shared/modules/global/jwt-token/jwt-token.service";

export const getFreshJwtTokenServiceMock = () => {
  const service = mock<JwtTokenService>();
  return service;
};
