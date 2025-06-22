import "@nestjs-modules/mailer";
import { ISendMailOptions, Sen } from "@nestjs-modules/mailer";
import { SentMessageInfo } from "nodemailer";

declare module "@nestjs-modules/mailer" {
  interface MailerServiceContext {
    sendMail(sendMailOptions: Omit<ISendMailOptions, "transporterName">): Promise<SentMessageInfo>;
  }
}
