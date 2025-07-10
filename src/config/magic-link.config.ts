import { BaseConfig } from "./base.config";

class MagicLinkConfig extends BaseConfig {
  constructor() {
    super();
  }

  readonly OPTIONS_INJECTOR_KEY = "INJECT:MAGIC_LINK_OPTIONS" as const;

  get magicLinkOptions(): MagicLinkOptions {
    return {
      frontendUrl: this.env.APP_FRONTEND_URL,
      verifyEmailPath: this.env.MAGIC_LINK_VERIFY_EMAIL_PATH,
      resetPasswordPath: this.env.MAGIC_LINK_RESET_PASSWORD_PATH,
    };
  }
}

export const magicLinkConfig = MagicLinkConfig.getInstance();
