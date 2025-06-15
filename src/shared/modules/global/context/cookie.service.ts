import { CookieOptions } from "express";
import { Injectable } from "@nestjs/common";
import { cookieConfig } from "src/config/cookie.config";
import { jwtRefreshConfig } from "src/config/jwt-refresh.config";
import { AsyncStorageService } from "./async-storage.service";

@Injectable()
export class CookieService {
  constructor(private readonly asyncStorageService: AsyncStorageService) {}

  private get req() {
    return this.asyncStorageService.getRequest();
  }

  private get res() {
    return this.asyncStorageService.getResponse();
  }

  get(key: string) {
    return (this.req?.cookies[key] as string) ?? "";
  }

  set(key: string, value: unknown, options?: CookieOptions) {
    this.res?.cookie(key, value, { ...cookieConfig.options, ...options });
  }

  clear(key: string, options?: CookieOptions) {
    this.res?.clearCookie(key, options);
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
