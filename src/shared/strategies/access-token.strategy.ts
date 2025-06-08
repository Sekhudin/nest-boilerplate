import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { jwtAccessConfig } from "src/config/jwt-access.config";
import { claimsSchema } from "src/shared/dto/jwt.dto";
import { validate } from "src/utils/validation";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, jwtAccessConfig.name) {
  constructor() {
    super(jwtAccessConfig.strategyOptions);
  }

  async validate(payload: unknown) {
    return validate(claimsSchema, payload);
  }
}
