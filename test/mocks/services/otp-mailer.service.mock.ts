import { mock } from "jest-mock-extended";
import { OtpMailerService } from "src/shared/modules/global/mailer/otp-mailer.service";

export const getFreshOtpMailerServiceMock = () => {
  const service = mock<OtpMailerService>();
  return service;
};
