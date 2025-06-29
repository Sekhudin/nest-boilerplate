import { OtpOptions } from "otp";
import { BaseConfig } from "./base.config";

class OtpConfig extends BaseConfig {
  constructor() {
    super();
  }

  get INJECTOR_KEY() {
    return "OTP_SERVICE";
  }

  get options(): OtpOptions {
    return {
      codeLength: 6,
      secret: "SECRET_OTP",
      epoch: 1,
    };
  }
}

export const otpConfig = OtpConfig.getInstance();
