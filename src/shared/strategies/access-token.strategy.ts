import { Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Claims } from "src/shared/dto/claims.dto";
import { jwtAccessConfig } from "src/config/jwt-access.config";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, jwtAccessConfig.name) {
  constructor() {
    super(jwtAccessConfig.strategyOptions);
  }

  async validate(payload: unknown) {
    return Claims.schema.validate(payload);
  }
}
