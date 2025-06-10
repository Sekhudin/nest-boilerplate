import { InjectResponseMiddleware } from "express";
import { INestApplication } from "@nestjs/common";
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

  private injectResponseMiddleware: InjectResponseMiddleware = (req, res, next) => {
    req.res = res;
    next();
  };

  setup(app: INestApplication): void {
    app.enableShutdownHooks();
    app.use(this.injectResponseMiddleware);
    app.setGlobalPrefix("api");
  }
}

export const appConfig = AppConfig.getInstance();
