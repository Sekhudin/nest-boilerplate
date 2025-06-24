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
