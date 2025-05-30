import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtAccessConfig } from "src/configs/jwt.config";
import type { JwtAuthPayload } from "src/types/global.type";

@Injectable()
export class JWTAccessStrategy extends PassportStrategy(Strategy, jwtAccessConfig.name) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtAccessConfig.secret,
    });
  }

  async validate(payload: JwtAuthPayload) {
    return payload;
  }
}
