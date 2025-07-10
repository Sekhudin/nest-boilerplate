import { authenticator, AuthenticatorOptions, hotp, HOTPOptions, totp, TOTPOptions } from "otplib";
import { BaseConfig } from "./base.config";

class OtpConfig extends BaseConfig {
  constructor() {
    super();
  }

  readonly SECRETS = {
    AUTHENTICATOR: this.env.AUTHENTICATOR_SECRET,
    HOTP: this.env.HOTP_SECRET,
    TOTP: this.env.TOTP_SECRET,
  };

  get authenticatorOptions(): AuthenticatorOptions {
    return {
      ...authenticator.options,
      digits: 6,
    };
  }

  get hotpOptions(): HOTPOptions {
    return {
      ...hotp.options,
      digits: 6,
    };
  }

  get totpOptions(): TOTPOptions {
    return {
      ...totp.options,
      digits: 6,
    };
  }
}

export const otpConfig = OtpConfig.getInstance();
