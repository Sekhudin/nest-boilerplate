import { mock } from "jest-mock-extended";
import { OtpGeneratorService } from "src/shared/modules/global/otp-generator/otp-generator.service";

export const getFreshOtpGeneratorServiceMock = () => {
  const service = mock<OtpGeneratorService>();
  return service;
};
