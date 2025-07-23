import { MailerService } from "@nestjs-modules/mailer";
import { mock } from "jest-mock-extended";

export const getFreshMailerServiceMock = () => {
  const service = mock<MailerService>();
  return service;
};
