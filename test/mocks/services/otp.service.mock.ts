import { mock } from "jest-mock-extended";
import { OtpService } from "src/modules/otp/otp.service";

export const getFreshOtpServiceMock = () => {
  const service = mock<OtpService>();
  return service;
};
