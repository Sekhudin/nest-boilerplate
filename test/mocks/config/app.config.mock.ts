import { MockConfig, mockDeep } from "jest-mock-extended";
import { appConfig } from "src/config/app.config";

type AppConfig = MockConfig<typeof appConfig>;
export const getFreshAppConfigMock = () => {
  const config = mockDeep<AppConfig>();

  const configMock: Partial<AppConfig> = {
    isProduction: false,
  };

  Object.assign(config, configMock);
  return config;
};
