import { mock } from "jest-mock-extended";
import { CookieService } from "src/shared/modules/global/context/cookie.service";

export const getFreshCookieServiceMock = () => {
  const service = mock<CookieService>();
  return service;
};
