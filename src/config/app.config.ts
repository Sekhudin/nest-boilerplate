import { INestApplication } from "@nestjs/common";
import { BaseConfig } from "./base.config";

export class AppConfig extends BaseConfig {
  constructor() {
    super();
  }

  static register(app: INestApplication, configs: BaseConfig[]): void {
    configs.forEach((config) => {
      config.setup(app);
    });
  }

  readonly APP_NAME = this.env.APP_NAME;
  readonly APP_VERSION = this.env.APP_VERSION;
  readonly APP_PORT = this.env.APP_PORT;
}

export const appConfig = AppConfig.getInstance();
