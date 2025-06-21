import { CookieOptions, Request } from "express";
import { StrategyOptionsWithoutRequest } from "passport-jwt";
import { JwtSignOptions, JwtVerifyOptions } from "@nestjs/jwt";
import { BaseConfig } from "./base.config";

class JwtRefreshConfig extends BaseConfig {
  constructor() {
    super();
  }

  get name() {
    return "JWT_REFRESH_TOKEN" as const;
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

  get strategyOptions(): StrategyOptionsWithoutRequest {
    return {
      jwtFromRequest: this.token,
      ignoreExpiration: false,
      secretOrKey: this.env.JWT_REFRESH_SECRET,
      algorithms: [this.env.JWT_ALGORITHM],
      issuer: this.env.JWT_ISSUER,
      audience: this.env.JWT_AUDIENCE,
    };
  }

  get cookieName() {
    return "REFRESH_TOKEN" as const;
  }

  get cookieOptions(): CookieOptions {
    return {
      domain: this.env.COOKIE_DOMAIN,
      secure: this.env.COOKIE_SECURE,
      httpOnly: true,
      sameSite: this.env.COOKIE_SAME_SITE,
      maxAge: this.env.COOKIE_MAX_AGE,
      path: "/",
      priority: "high",
    };
  }

  private get token() {
    return (req: Request) => {
      const refreshToken = req.cookies[this.cookieName];
      return (refreshToken as string) ?? "";
    };
  }
}

export const jwtRefreshConfig = JwtRefreshConfig.getInstance();
