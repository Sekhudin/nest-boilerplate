import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, JwtFromRequestFunction } from "passport-jwt";
import { jwtRefreshConfig } from "src/configs/jwt.config";
import type { JwtAuthPayload } from "src/types/global.type";

@Injectable()
export class JWTRefreshStrategy extends PassportStrategy(Strategy, jwtRefreshConfig.name) {
  constructor() {
    super({
      jwtFromRequest: extractFromCookie,
      ignoreExpiration: false,
      secretOrKey: jwtRefreshConfig.secret,
    });
  }

  async validate(payload: JwtAuthPayload) {
    return payload;
  }
}

const extractFromCookie: JwtFromRequestFunction<Request> = (req) => {
  const refreshToken = req.cookies[jwtRefreshConfig.cookieName];
  return refreshToken;
};
