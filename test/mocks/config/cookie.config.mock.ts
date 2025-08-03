import { MockConfig } from "jest-mock-extended";
import { cookieConfig } from "src/config/cookie.config";

type CookieConfig = MockConfig<typeof cookieConfig>;
export const getFreshCookieConfigMock = () => {
  const config: CookieConfig = {
    environment: "test",
    isProduction: false,
    COOKIE_NAME: {
      DEVICE_ID: "DEVICE_ID",
    },
    cookieOptions: {},
    setup(app) {},
  };
  return config;
};
