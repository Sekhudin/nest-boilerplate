import { DefaultContext, ISendMailOptions, MailerService, MailerServiceContext } from "@nestjs-modules/mailer";
import { SentMessageInfo } from "nodemailer";
import { Injectable } from "@nestjs/common";
import { mailerConfig } from "src/config/mailer.config";

@Injectable()
export class BillingMailerService implements MailerServiceContext {
  constructor(private readonly mailerService: MailerService) {}

  createContext<T>(context: Partial<DefaultContext> & T): DefaultContext & T {
    return mailerConfig.context<T>(context);
  }

  sendMail(sendMailOptions: Omit<ISendMailOptions, "transporterName">): Promise<SentMessageInfo> {
    return this.mailerService.sendMail({
      transporterName: mailerConfig.TRANSPORTERS.BILLING,
      ...sendMailOptions,
    });
  }

  send() {
    return this.sendMail({
      subject: "BILLING!",
      to: "sekhudinpbg3@gmail.com",
      template: "default-billing",
    });
  }
}
