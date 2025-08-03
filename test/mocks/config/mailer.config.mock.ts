import { DefaultContext, MAILER_OPTIONS } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { MockConfig, mockDeep } from "jest-mock-extended";
import { mailerConfig } from "src/config/mailer.config";

type MailerConfig = MockConfig<typeof mailerConfig>;
export const getFreshMailerConfigMock = () => {
  const config: MailerConfig = {
    environment: "test",
    isProduction: false,
    TRANSPORTERS: { OTP: "OTP_TRANSPORT", BILLING: "BILLING_TRANSPORT", NEWSLETTER: "NEWSLETTER_TRANSPORT" },
    mailerOptions: {
      template: {
        adapter: mockDeep<HandlebarsAdapter>(),
      },
    },
    context<T>(contextValue: T) {
      return { year: 2025, ...contextValue } as DefaultContext & T;
    },
    emailFrom(senderType) {
      return senderType;
    },
    setup(app) {},
  };
  return config;
};

export { MAILER_OPTIONS };
