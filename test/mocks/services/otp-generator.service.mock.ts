import { mock } from "jest-mock-extended";
import { OtpGeneratorService } from "src/shared/modules/global/otp-generator/otp-generator.service";

export const getFreshOtpGeneratorServiceMock = () => {
  const service = mock<OtpGeneratorService>();

  service.generateOtp.mockReturnValue({ code: "123456", expiresAt: new Date(), expiresInMinutes: 5 });
  service.isOtpExpired.mockReturnValue(false);
  return service;
};
