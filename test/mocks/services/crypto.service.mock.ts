import { mock } from "jest-mock-extended";
import { CryptoService } from "src/shared/modules/global/crypto/crypto.service";

export const getFreshCryptoServiceMock = () => {
  const service = mock<CryptoService>();

  service.hashOtp.mockResolvedValue("hashed:otp123456");
  return service;
};
