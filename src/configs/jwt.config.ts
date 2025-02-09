import * as env from "./env.config";
import type { JwtConfig } from "src/types/global.type";

export const jwtAccessConfig: JwtConfig<"secret"> = {
  name: env.JWT_ACCESS_NAME,
  secret: env.JWT_ACCESS_SECRET,
  signOptions: {
    secret: env.JWT_ACCESS_SECRET,
    expiresIn: env.JWT_ACCESS_EXPIRATION,
  },
  verifyOptions: {
    secret: env.JWT_ACCESS_SECRET,
  },
};

export const jwtRefreshConfig: JwtConfig<"secret" | "cookieName"> = {
  name: env.JWT_REFRESH_NAME,
  secret: env.JWT_REFRESH_SECRET,
  cookieName: env.JWT_REFRESH_COOKIE,
  signOptions: {
    secret: env.JWT_REFRESH_SECRET,
    expiresIn: env.JWT_REFRESH_EXPIRATION,
  },
  verifyOptions: {
    secret: env.JWT_REFRESH_SECRET,
  },
};
