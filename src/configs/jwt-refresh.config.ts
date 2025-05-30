import { BaseConfig } from "./base.config";

class JwtRefreshConfig extends BaseConfig {
  constructor() {
    super();
  }

  get name() {
    return "JWT_REFRESH_TOKEN";
  }

  get cookieName() {
    return "REFRESH_TOKEN";
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

export const jwtRefreshConfig = JwtRefreshConfig.getInstance();
