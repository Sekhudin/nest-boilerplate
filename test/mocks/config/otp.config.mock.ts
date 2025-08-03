import { MockConfig } from "jest-mock-extended";
import { otpConfig } from "src/config/otp.config";

type OtpConfig = MockConfig<typeof otpConfig>;
export const getFreshOtpConfigMock = () => {
  const config: OtpConfig = {
    environment: "test",
    isProduction: false,
    SECRETS: {
      AUTHENTICATOR: "",
      HOTP: "",
      TOTP: "",
    },
    authenticatorOptions: {},
    hotpOptions: {},
    totpOptions: {},
    setup(app) {},
  };
  return config;
};
