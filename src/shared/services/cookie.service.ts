import type { CookieOptions } from "express";
import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { jwtRefreshConfig } from "src/config/jwt-refresh.config";
import { RequestWithRes } from "src/types/global";

@Injectable({ scope: Scope.REQUEST })
export class CookieService {
  private readonly res: RequestWithRes["res"];

  constructor(@Inject(REQUEST) private readonly req: RequestWithRes) {
    this.res = req.res;
  }

  get(key: string) {
    console.log(this.req.cookies)
    return (this.req.cookies[key] as string) || "";
  }

  set(key: string, value: unknown, options?: CookieOptions) {
    this.res.cookie(key, value, options);
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
