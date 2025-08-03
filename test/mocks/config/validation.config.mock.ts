import { MockConfig } from "jest-mock-extended";
import { validationConfig } from "src/config/validation.config";

type ValidationConfig = MockConfig<typeof validationConfig>;
export const getFreshValidationConfigMock = () => {
  const config: ValidationConfig = {
    environment: "test",
    isProduction: false,
    SCHEMA_META_KEY: "META:SCHEMA",
    setup(app) {},
  };
  return config;
};
