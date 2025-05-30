import { INestApplication } from "@nestjs/common";
import { BaseConfig } from "./base.config";

class AppConfig extends BaseConfig {
  constructor() {
    super();
  }

  get port(): number {
    return this.env.APP_PORT;
  }

  get runningMessage() {
    console.log(this.env);
    return `[${this.env.APP_ENV}] running on port ${this.env.APP_PORT}`;
  }

  setup(app: INestApplication): void {
    app.enableShutdownHooks();
  }
}

export const appConfig = AppConfig.getInstance();
