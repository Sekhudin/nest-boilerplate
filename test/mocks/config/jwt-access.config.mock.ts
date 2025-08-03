import { MockConfig } from "jest-mock-extended";
import { ExtractJwt } from "passport-jwt";
import { jwtAccessConfig } from "src/config/jwt-access.config";

type JwtAccessConfig = MockConfig<typeof jwtAccessConfig>;
export const getFreshJwtAccessConfigMock = () => {
  const config: JwtAccessConfig = {
    environment: "test",
    isProduction: false,
    STRATEGY_NAME: "JWT_ACCESS_TOKEN",
    strategyOptions: {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secret-jwt-access",
    },
    signOptions: {},
    verifyOptions: {},
    setup(app) {},
  };
  return config;
};
