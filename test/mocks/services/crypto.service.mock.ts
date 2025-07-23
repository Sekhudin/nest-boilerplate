import { mock } from "jest-mock-extended";
import { CryptoService } from "src/shared/modules/global/crypto/crypto.service";

export const getFreshCryptoServiceMock = () => {
  const service = mock<CryptoService>();
  return service;
};
