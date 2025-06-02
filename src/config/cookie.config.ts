import { INestApplication } from "@nestjs/common";
import cookieParser from "cookie-parser";
import { BaseConfig } from "./base.config";

class CookieConfig extends BaseConfig {
  constructor() {
    super();
  }

  setup(app: INestApplication): void {
    app.use(cookieParser());
  }
}

export const cookieConfig = CookieConfig.getInstance();
