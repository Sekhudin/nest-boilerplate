import { MailerService } from "@nestjs-modules/mailer";
import { mock } from "jest-mock-extended";

export const getFreshMailerServiceMock = () => {
  const service = mock<MailerService>();

  service.sendMail.mockResolvedValue({ response: "200" });
  return service;
};
