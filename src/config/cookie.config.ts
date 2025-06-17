import { CookieOptions } from "express";
import { INestApplication } from "@nestjs/common";
import cookieParser from "cookie-parser";
import { BaseConfig } from "./base.config";

class CookieConfig extends BaseConfig {
  constructor() {
    super();
  }

  get name() {
    return {
      deviceId: "DEVICE_ID",
    } as const;
  }

  get options(): CookieOptions {
    return {
      domain: this.env.COOKIE_DOMAIN,
      secure: this.env.COOKIE_SECURE,
      httpOnly: this.env.COOKIE_HTTP_ONLY,
      sameSite: this.env.COOKIE_SAME_SITE,
      maxAge: this.env.COOKIE_MAX_AGE,
      path: this.env.COOKIE_PATH,
      priority: this.env.COOKIE_PRIORITY,
    };
  }

  setup(app: INestApplication): void {
    app.use(cookieParser());
  }
}

export const cookieConfig = CookieConfig.getInstance();
