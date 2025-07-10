import { Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Claims } from "src/shared/dto/claims.dto";
import { jwtRefreshConfig } from "src/config/jwt-refresh.config";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, jwtRefreshConfig.STRATEGY_NAME) {
  constructor() {
    super(jwtRefreshConfig.strategyOptions);
  }

  async validate(payload: any) {
    return Claims.schema.validate(payload);
  }
}
