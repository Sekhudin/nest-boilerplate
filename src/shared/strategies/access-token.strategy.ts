import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { jwtAccessConfig } from "src/config/jwt-access.config";
import { Claims } from "src/shared/dto/claims.dto";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, jwtAccessConfig.name) {
  constructor() {
    super(jwtAccessConfig.strategyOptions);
  }

  async validate(payload: unknown) {
    return Claims.schema.validate(payload);
  }
}
