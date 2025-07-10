import { DefaultContext, ISendMailOptions, MailerService, MailerServiceContext } from "@nestjs-modules/mailer";
import { SentMessageInfo } from "nodemailer";
import { Injectable } from "@nestjs/common";
import { mailerConfig } from "src/config/mailer.config";

@Injectable()
export class OtpMailerService implements MailerServiceContext {
  constructor(private readonly mailerService: MailerService) {}

  createContext<T>(context: Partial<DefaultContext> & T): DefaultContext & T {
    return mailerConfig.context<T>(context);
  }

  sendMail(sendMailOptions: Omit<ISendMailOptions, "transporterName">): Promise<SentMessageInfo> {
    return this.mailerService.sendMail({
      transporterName: mailerConfig.TRANSPORTERS.OTP,
      ...sendMailOptions,
    });
  }

  checkDefaultContext() {
    return this.sendMail({
      subject: "CHECK DEFAULT CONTEXT!",
      to: "sekhudinpbg3@gmail.com",
      layout: "plain",
      template: "check-default-context",
      context: this.createContext({}),
    });
  }

  sendEmailVerification(emailContext: SendEmailVerificationContext) {
    const context = this.createContext(emailContext);
    return this.sendMail({
      subject: `Verify your email for ${context.appName}`,
      from: mailerConfig.emailFrom("NO_REPLY"),
      to: context.to,
      layout: "otp",
      template: "email-verification",
      context,
      headers: {
        "X-Mail-Category": "email-verification",
        "X-App-Name": context.appName,
      },
    });
  }

  send() {
    return this.sendMail({
      subject: "OTP!",
      to: "sekhudinpbg3@gmail.com",
      template: "default-otp",
    });
  }
}
