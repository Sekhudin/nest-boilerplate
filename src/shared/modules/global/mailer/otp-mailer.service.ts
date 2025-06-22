import { ISendMailOptions, MailerService, MailerServiceContext } from "@nestjs-modules/mailer";
import { SentMessageInfo } from "nodemailer";
import { Injectable } from "@nestjs/common";
import { mailerConfig } from "src/config/mailer.config";

@Injectable()
export class OtpMailerService implements MailerServiceContext {
  constructor(private readonly mailerService: MailerService) {}

  sendMail(sendMailOptions: Omit<ISendMailOptions, "transporterName">): Promise<SentMessageInfo> {
    return this.mailerService.sendMail({
      transporterName: mailerConfig.transporter.otp,
      ...sendMailOptions,
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
