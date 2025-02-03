import { Injectable } from "@nestjs/common";
import type { Request, Response } from "express";
import { jwtRefreshCookieConfig } from "src/configs/cookie.config";

@Injectable()
export class CookieService {
  getCookieRefreshToke(req: Request) {
    return req.cookies[jwtRefreshCookieConfig.name];
  }

  setCookieRefreshToken(res: Response, token: string): void {
    res.cookie(jwtRefreshCookieConfig.name, token, jwtRefreshCookieConfig.options);
  }

  clearCookieRefreshToken(res: Response): void {
    res.clearCookie(jwtRefreshCookieConfig.name);
    return;
  }
}
