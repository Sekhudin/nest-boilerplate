import path from "path";
import { MailerOptions } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { BaseConfig } from "./base.config";

class MailerConfig extends BaseConfig {
  constructor() {
    super();
  }

  get transporter() {
    return {
      otp: "OTP_TRANSPORT",
      billing: "BILLING_TRANSPORT",
      newsletter: "NEWSLETTER_TRANSPORT",
    } as const;
  }

  get options(): MailerOptions {
    const dir = path.join(process.cwd(), "src/shared/modules/global/mailer/templates");
    const partials = path.join(dir, "partials");

    return {
      transports: this.transports,
      defaults: {
        from: this.env.MAIL_FROM,
      },
      template: {
        adapter: new HandlebarsAdapter(),
        dir,
        options: {
          partials,
          layout: "plain",
          strict: true,
        },
      },
    };
  }

  private get transports(): MailerOptions["transports"] {
    return {
      [this.transporter.otp]: {
        host: this.env.OTP_MAIL_HOST,
        port: this.env.OTP_MAIL_PORT,
        auth: {
          user: this.env.OTP_MAIL_USER,
          pass: this.env.OTP_MAIL_PASS,
        },
      },
      [this.transporter.billing]: {
        host: this.env.BILLING_MAIL_HOST,
        port: this.env.BILLING_MAIL_PORT,
        auth: {
          user: this.env.BILLING_MAIL_USER,
          pass: this.env.BILLING_MAIL_PASS,
        },
      },
      [this.transporter.newsletter]: {
        host: this.env.NEWSLETTER_MAIL_HOST,
        port: this.env.NEWSLETTER_MAIL_PORT,
        auth: {
          user: this.env.NEWSLETTER_MAIL_USER,
          pass: this.env.NEWSLETTER_MAIL_PASS,
        },
      },
    };
  }
}

export const mailerConfig = MailerConfig.getInstance();
