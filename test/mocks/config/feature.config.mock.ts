import { MockConfig } from "jest-mock-extended";
import { featureConfig } from "src/config/feature.config";

type FeatureConfig = MockConfig<typeof featureConfig>;
export const getFreshFeatureConfigMock = () => {
  const config: FeatureConfig = {
    environment: "test",
    isProduction: false,
    isApiDocsEnabled: true,
    isDebugEnabled: true,
    isDbLoggingEnabled: true,
    isSignUpEnabled: true,
    isThrottlerEnabled: true,
    setup(app) {},
  };
  return config;
};
