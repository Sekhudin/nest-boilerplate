import { SendEmailVerificationContext } from "@nestjs-modules/mailer";
import { mock, mockDeep } from "jest-mock-extended";
import { OtpMailerService } from "src/shared/modules/global/mailer/otp-mailer.service";

export const getFreshOtpMailerServiceMock = () => {
  const service = mock<OtpMailerService>();

  service.sendMail.mockResolvedValue({ response: "200" });
  service.sendEmailVerification.mockResolvedValue(mockDeep<SendEmailVerificationContext>());
  return service;
};
