import { JwtSignOptions, JwtVerifyOptions } from "@nestjs/jwt";
import { ExtractJwt, StrategyOptionsWithoutRequest } from "passport-jwt";
import { BaseConfig } from "./base.config";

class JwtAccessConfig extends BaseConfig {
  constructor() {
    super();
  }

  get name() {
    return "JWT_ACCESS_TOKEN" as const;
  }

  get signOptions(): JwtSignOptions {
    return {
      algorithm: this.env.JWT_ALGORITHM,
      secret: this.env.JWT_ACCESS_SECRET,
      expiresIn: this.env.JWT_ACCESS_EXPIRES_IN,
      issuer: this.env.JWT_ISSUER,
      audience: this.env.JWT_AUDIENCE,
    };
  }

  get verifyOptions(): JwtVerifyOptions {
    return {
      algorithms: [this.env.JWT_ALGORITHM],
      secret: this.env.JWT_ACCESS_SECRET,
      issuer: this.env.JWT_ISSUER,
      audience: this.env.JWT_AUDIENCE,
    };
  }

  get strategyOptions(): StrategyOptionsWithoutRequest {
    return {
      jwtFromRequest: this.token,
      ignoreExpiration: false,
      secretOrKey: this.env.JWT_ACCESS_SECRET,
      algorithms: [this.env.JWT_ALGORITHM],
      issuer: this.env.JWT_ISSUER,
      audience: this.env.JWT_AUDIENCE,
    };
  }

  private get token() {
    return ExtractJwt.fromAuthHeaderAsBearerToken();
  }
}

export const jwtAccessConfig = JwtAccessConfig.getInstance();
