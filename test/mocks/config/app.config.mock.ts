import { MockConfig } from "jest-mock-extended";
import { appConfig } from "src/config/app.config";

type AppConfig = MockConfig<typeof appConfig>;
export const getFreshAppConfigMock = () => {
  const config: AppConfig = {
    environment: "test",
    isProduction: false,
    APP_NAME: "damn",
    APP_PORT: 5000,
    APP_VERSION: "1.0.0",
    setup(app) {},
  };
  return config;
};
