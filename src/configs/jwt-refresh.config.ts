import { CookieOptions } from "express";
import { JwtSignOptions, JwtVerifyOptions } from "@nestjs/jwt";
import { BaseConfig } from "./base.config";

class JwtRefreshConfig extends BaseConfig {
  constructor() {
    super();
  }

  get name() {
    return "JWT_REFRESH_TOKEN";
  }

  get signOptions(): JwtSignOptions {
    return {
      algorithm: this.env.JWT_ALGORITHM,
      secret: this.env.JWT_REFRESH_SECRET,
      expiresIn: this.env.JWT_REFRESH_EXPIRES_IN,
      issuer: this.env.JWT_ISSUER,
      audience: this.env.JWT_AUDIENCE,
    };
  }

  get verifyOptions(): JwtVerifyOptions {
    return {
      algorithms: [this.env.JWT_ALGORITHM],
      secret: this.env.JWT_REFRESH_SECRET,
      issuer: this.env.JWT_ISSUER,
      audience: this.env.JWT_AUDIENCE,
    };
  }

  get cookieName() {
    return "REFRESH_TOKEN";
  }

  get cookieOptions(): CookieOptions {
    return {
      domain: this.env.COOKIE_DOMAIN,
      maxAge: this.env.COOKIE_MAX_AGE,
      secure: this.env.COOKIE_SECURE,
      sameSite: this.env.COOKIE_SAME_SITE,
      httpOnly: true,
    };
  }
}

export const jwtRefreshConfig = JwtRefreshConfig.getInstance();
