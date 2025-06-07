import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { jwtRefreshConfig } from "src/config/jwt-refresh.config";
import { jwtClaimsDto } from "src/shared/dto/jwt.dto";
import { validate } from "src/utils/validation";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, jwtRefreshConfig.name) {
  constructor() {
    super(jwtRefreshConfig.strategyOptions);
  }

  async validate(payload: any) {
    return validate(jwtClaimsDto, payload);
  }
}
