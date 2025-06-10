import type { CookieOptions, RequestWithResponse, Response } from "express";
import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { cookieConfig } from "src/config/cookie.config";
import { jwtRefreshConfig } from "src/config/jwt-refresh.config";

@Injectable({ scope: Scope.REQUEST })
export class CookieService {
  private readonly res: Response;

  constructor(@Inject(REQUEST) private readonly req: RequestWithResponse) {
    this.res = req.res as Response;
  }

  get(key: string) {
    return (this.req.cookies[key] as string) || "";
  }

  set(key: string, value: unknown, options?: CookieOptions) {
    this.res.cookie(key, value, { ...cookieConfig.options, ...options });
  }

  clear(key: string, options?: CookieOptions) {
    this.res.clearCookie(key, options);
  }

  getRefreshToken() {
    return this.get(jwtRefreshConfig.cookieName);
  }

  setRefreshToken(value: string) {
    return this.set(jwtRefreshConfig.cookieName, value, jwtRefreshConfig.cookieOptions);
  }

  clearRefreshToken() {
    return this.clear(jwtRefreshConfig.cookieName);
  }
}
