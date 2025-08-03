import { MockConfig } from "jest-mock-extended";
import { corsConfig } from "src/config/cors.config";

type CorsConfig = MockConfig<typeof corsConfig>;
export const getFreshCorsConfigMock = () => {
  const config: CorsConfig = {
    environment: "test",
    isProduction: false,
    setup(app) {},
  };
  return config;
};
