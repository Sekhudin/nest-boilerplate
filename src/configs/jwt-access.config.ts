import { BaseConfig } from "./base.config";

class JwtAccessConfig extends BaseConfig {
  constructor() {
    super();
  }

  get name() {
    return "JWT_ACCESS_TOKEN";
  }

  get secret() {
    return this.env.APP_NAME;
  }

  get signOptions() {
    return {};
  }

  get verifyOptions() {
    return {};
  }
}

export const jwtAccessConfig = JwtAccessConfig.getInstance();
