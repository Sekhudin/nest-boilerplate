import type { CookieConfig } from "src/types/global.type";
import * as env from "./env.config";

const getMaxAgeInDay = (day: number) => {
  return day * 24 * 60 * 60 * 1000;
};

export const jwtRefreshCookieConfig: CookieConfig<"name"> = {
  name: env.JWT_REFRESH_COOKIE,
  options: {
    httpOnly: true,
    secure: env.isMatch(env.JWT_REFRESH_COOKIE_SECURE, "true"),
    sameSite: "strict",
    maxAge: getMaxAgeInDay(6),
  },
};
