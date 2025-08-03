import { MockConfig } from "jest-mock-extended";
import { winstonConfig } from "src/config/winston.config";

type WinstonConfig = MockConfig<typeof winstonConfig>;
export const getFreshWinstonConfigMock = () => {
  const config: WinstonConfig = {
    environment: "test",
    isProduction: false,
    loggerOptions: {},
    setup(app) {},
  };
  return config;
};
