import { BaseConfig } from "./base.config";

class JwtAccessConfig extends BaseConfig {
  constructor() {
    super();
  }

  get name() {
    return "JWT_ACCESS_TOKEN";
  }

  get signOptions() {
    return {
      algorithm: this.env.JWT_ALGORITHM,
      secret: this.env.JWT_ACCESS_SECRET,
      expiresIn: this.env.JWT_ACCESS_EXPIRES_IN,
      issuer: this.env.JWT_ISSUER,
      audience: this.env.JWT_AUDIENCE,
    };
  }

  get verifyOptions() {
    return {
      algorithms: [this.env.JWT_ALGORITHM],
      secret: this.env.JWT_ACCESS_SECRET,
      issuer: this.env.JWT_ISSUER,
      audience: this.env.JWT_AUDIENCE,
    };
  }
}

export const jwtAccessConfig = JwtAccessConfig.getInstance();
