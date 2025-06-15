import { BaseConfig } from "./base.config";

class AppConfig extends BaseConfig {
  constructor() {
    super();
  }

  get name() {
    return this.env.APP_NAME;
  }

  get version() {
    return this.env.APP_VERSION;
  }

  get port(): number {
    return this.env.APP_PORT;
  }
}

export const appConfig = AppConfig.getInstance();
