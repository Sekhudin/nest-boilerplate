import { DefaultContext, ISendMailOptions, MailerService, MailerServiceContext } from "@nestjs-modules/mailer";
import { SentMessageInfo } from "nodemailer";
import { Injectable } from "@nestjs/common";
import { mailerConfig } from "src/config/mailer.config";

@Injectable()
export class NewsletterMailerService implements MailerServiceContext {
  constructor(private readonly mailerService: MailerService) {}

  createContext<T>(context: Partial<DefaultContext> & T): DefaultContext & T {
    return mailerConfig.context<T>(context);
  }

  sendMail(sendMailOptions: Omit<ISendMailOptions, "transporterName">): Promise<SentMessageInfo> {
    return this.mailerService.sendMail({
      transporterName: mailerConfig.TRANSPORTERS.NEWSLETTER,
      ...sendMailOptions,
    });
  }

  send() {
    return this.sendMail({
      subject: "NEWSLETTER!",
      to: "sekhudinpbg3@gmail.com",
      template: "default-newsletter",
    });
  }
}
