import { BaseConfig } from "./base.config";

class ValidationConfig extends BaseConfig {
  constructor() {
    super();
  }

  readonly SCHEMA_META_KEY = "META:SCHEMA" as const;
}

export const validationConfig = ValidationConfig.getInstance();
