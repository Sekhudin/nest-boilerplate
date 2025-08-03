import { MockConfig } from "jest-mock-extended";
import { DocumentBuilder } from "@nestjs/swagger";
import { swaggerConfig } from "src/config/swagger.config";

type SwaggerConfig = MockConfig<typeof swaggerConfig>;
export const getFreshSwaggerConfigMock = () => {
  const config: SwaggerConfig = {
    environment: "test",
    isProduction: false,
    buildConfig() {
      return new DocumentBuilder().build();
    },
    setup(app) {},
  };
  return config;
};
