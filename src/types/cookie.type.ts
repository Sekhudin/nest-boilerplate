import type { CookieOptions } from "express";

export type CookieConfig<T extends string> = Record<T, string> & {
  options: CookieOptions;
};
