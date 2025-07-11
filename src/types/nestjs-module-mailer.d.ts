import "@nestjs-modules/mailer";
import { ISendMailOptions } from "@nestjs-modules/mailer";
import { SentMessageInfo } from "nodemailer";

declare module "@nestjs-modules/mailer" {
  interface MailerServiceContext {
    createContext<T>(context: Partial<DefaultContext> & T): DefaultContext & T;
    sendMail(sendMailOptions: Omit<ISendMailOptions, "transporterName">): Promise<SentMessageInfo>;
  }

  interface ISendMailOptions {
    layout?: string;
  }

  interface DefaultContext {
    appName: string;
    year: number;
    unsubscribeLink: string;
    billingAddressEmail: string;
  }

  interface SendEmailVerificationContext {
    to: string;
    code: string;
    magicLink: string;
    expiresInMinutes: number;
    ipAddress?: string;
    browser?: string;
    os?: string;
  }
}
