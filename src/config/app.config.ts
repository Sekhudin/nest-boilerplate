import { INestApplication } from "@nestjs/common";
import { ExpressMiddleware } from "src/types/global";
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

  get runningMessage() {
    return `app running on port ${this.env.APP_PORT}`;
  }

  private injectResponseObject: ExpressMiddleware = (req, res, next) => {
    req.res = res;
    next();
  };

  setup(app: INestApplication): void {
    app.enableShutdownHooks();
    app.use(this.injectResponseObject);
    app.setGlobalPrefix("api");
  }
}

export const appConfig = AppConfig.getInstance();
