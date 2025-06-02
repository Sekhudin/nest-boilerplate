import { INestApplication } from "@nestjs/common";
import { ExpressMiddleware } from "src/types/global";
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

  private injectResponseObject: ExpressMiddleware = (req, res, next) => {
    req.res = res;
    next();
  };

  setup(app: INestApplication): void {
    app.enableShutdownHooks();
    app.use(this.injectResponseObject);
  }
}

export const appConfig = AppConfig.getInstance();
