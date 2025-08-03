import { MockConfig } from "jest-mock-extended";
import { ExtractJwt } from "passport-jwt";
import { jwtRefreshConfig } from "src/config/jwt-refresh.config";

type JwtRefreshConfig = MockConfig<typeof jwtRefreshConfig>;
export const getFreshJwtRefreshConfigMock = () => {
  const config: JwtRefreshConfig = {
    environment: "test",
    isProduction: false,
    STRATEGY_NAME: "JWT_REFRESH_TOKEN",
    COOKIE_NAME: "REFRESH_TOKEN",
    cookieOptions: {},
    strategyOptions: {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secret-jwt-refresh",
    },
    signOptions: {},
    verifyOptions: {},
    setup(app) {},
  };
  return config;
};
