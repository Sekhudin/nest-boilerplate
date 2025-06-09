import { BaseConfig } from "./base.config";

class FeatureConfig extends BaseConfig {
  constructor() {
    super();
  }

  get isDebugEnabled() {
    return this.env.FEATURE_DEBUG_ENABLED;
  }

  get isApiDocsEnabled() {
    return this.env.FEATURE_API_DOCS_ENABLED;
  }

  get isDbLoggingEnabled() {
    return this.env.FEATURE_DB_LOGGING_ENABLED;
  }

  get isThrottlerEnabled() {
    return this.env.FEATURE_THROTTLER_ENABLED;
  }

  get isSignUpEnabled() {
    return this.env.FEATURE_SIGNUP_ENABLED;
  }
}

export const featureConfig = FeatureConfig.getInstance();
