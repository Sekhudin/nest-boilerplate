import { randomUUID } from "crypto";
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
    return (this.req.cookies[key] as string) ?? "";
  }

  set(key: string, value: unknown, options?: CookieOptions) {
    this.res.cookie(key, value, { ...cookieConfig.cookieOptions, ...options });
  }

  clear(key: string, options?: CookieOptions) {
    this.res.clearCookie(key, options);
  }

  getDeviceId() {
    return this.get(cookieConfig.COOKIE_NAME.DEVICE_ID);
  }

  setDeviceId() {
    if (!this.getDeviceId()) {
      this.set(cookieConfig.COOKIE_NAME.DEVICE_ID, randomUUID(), { maxAge: undefined });
    }
  }

  clearDeviceId() {
    this.clear(cookieConfig.COOKIE_NAME.DEVICE_ID);
  }

  getRefreshToken() {
    return this.get(jwtRefreshConfig.COOKIE_NAME);
  }

  setRefreshToken(value: string) {
    this.setDeviceId();
    return this.set(jwtRefreshConfig.COOKIE_NAME, value, jwtRefreshConfig.cookieOptions);
  }

  clearRefreshToken() {
    return this.clear(jwtRefreshConfig.COOKIE_NAME);
  }
}
