import { MockConfig } from "jest-mock-extended";
import { throttlerConfig } from "src/config/throttler.config";

type ThrottlerConfig = MockConfig<typeof throttlerConfig>;
export const getFreshThrottlerConfigMock = () => {
  const config: ThrottlerConfig = {
    environment: "test",
    isProduction: false,
    throttlerModuleOptions: [{ limit: 100, ttl: 60 }],
    setup(app) {},
  };
  return config;
};
