import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { jwtRefreshConfig } from "src/config/jwt-refresh.config";
import { Claims } from "src/shared/dto/claims.dto";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, jwtRefreshConfig.name) {
  constructor() {
    super(jwtRefreshConfig.strategyOptions);
  }

  async validate(payload: any) {
    return Claims.schema.validate(payload);
  }
}
