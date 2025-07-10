import path from "path";
import { DefaultContext, MailerOptions } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { getYear } from "date-fns";
import { BaseConfig } from "./base.config";

class MailerConfig extends BaseConfig {
  constructor() {
    super();
  }

  private readonly SENDER_TYPES = {
    NO_REPLY: "no-reply",
    SUPPORT: "support",
    BILLING: "billing",
  } as const;

  readonly TRANSPORTERS = {
    OTP: "OTP_TRANSPORT",
    BILLING: "BILLING_TRANSPORT",
    NEWSLETTER: "NEWSLETTER_TRANSPORT",
  } as const;

  get mailerOptions(): MailerOptions {
    const dir = path.join(process.cwd(), "src/shared/modules/global/mailer/templates");
    const partials = path.join(dir, "partials");

    return {
      transports: this.transportsOptions,
      defaults: {
        from: this.emailFrom("NO_REPLY"),
      },
      template: {
        adapter: new HandlebarsAdapter({
          context: (context: any) => JSON.stringify(context, null, 2),
        }),
        dir,
        options: {
          partials,
          layout: "plain",
          strict: true,
        },
      },
    };
  }

  context<T>(contextValue: T): DefaultContext & T {
    return {
      appName: this.env.APP_NAME,
      year: getYear(new Date()),
      unsubscribeLink: "http://app.com/unsub",
      billingAddressEmail: "billing@mail.com",
      ...contextValue,
    };
  }

  emailFrom(senderType: keyof typeof this.SENDER_TYPES) {
    const displayName = {
      [this.SENDER_TYPES.NO_REPLY]: `${this.env.APP_NAME} Security`,
      [this.SENDER_TYPES.SUPPORT]: `${this.env.APP_NAME} Support`,
      [this.SENDER_TYPES.BILLING]: `${this.env.APP_NAME} Billing`,
    }[senderType];
    return `"${displayName}" <${senderType}@${this.env.MAILER_DOMAIN}>`;
  }

  private get transportsOptions(): MailerOptions["transports"] {
    return {
      [this.TRANSPORTERS.OTP]: {
        host: this.env.OTP_MAIL_HOST,
        port: this.env.OTP_MAIL_PORT,
        auth: {
          user: this.env.OTP_MAIL_USER,
          pass: this.env.OTP_MAIL_PASS,
        },
      },
      [this.TRANSPORTERS.BILLING]: {
        host: this.env.BILLING_MAIL_HOST,
        port: this.env.BILLING_MAIL_PORT,
        auth: {
          user: this.env.BILLING_MAIL_USER,
          pass: this.env.BILLING_MAIL_PASS,
        },
      },
      [this.TRANSPORTERS.NEWSLETTER]: {
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
