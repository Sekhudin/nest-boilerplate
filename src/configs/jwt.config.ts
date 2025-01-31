import * as env from "./env.config";
import type { JwtConfig } from "src/types/jwt.type";

export const jwtAccessConfig: JwtConfig<"secret"> = {
  name: env.JWT_ACCESS_NAME,
  secret: env.JWT_ACCESS_SECRET,
  signOptions: {
    secret: env.JWT_ACCESS_SECRET,
    expiresIn: env.JWT_ACCESS_EXPIRATION,
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
};
