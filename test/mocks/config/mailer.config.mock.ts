import { DefaultContext, MAILER_OPTIONS } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { MockConfig, mockDeep } from "jest-mock-extended";
import { mailerConfig } from "src/config/mailer.config";

type MailerConfig = MockConfig<typeof mailerConfig>;
export const getFreshMailerConfigMock = () => {
  const config = mockDeep<MailerConfig>();

  config.context.mockImplementation(<T>(contextValue: T) => ({ year: 2025, ...contextValue }) as DefaultContext & T);
  config.emailFrom.mockImplementation((senderType) => senderType);

  const configMock: Partial<MailerConfig> = {
    TRANSPORTERS: { OTP: "OTP_TRANSPORT", BILLING: "BILLING_TRANSPORT", NEWSLETTER: "NEWSLETTER_TRANSPORT" },
    mailerOptions: {
      template: {
        adapter: mockDeep<HandlebarsAdapter>(),
      },
    },
  };

  Object.assign(config, configMock);
  return config;
};

export { MAILER_OPTIONS };
