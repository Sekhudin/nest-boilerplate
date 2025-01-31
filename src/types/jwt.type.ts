import type { JwtSignOptions } from "@nestjs/jwt";

type PayloadMeta = Record<"iat" | "exp", string>;
export type JwtParams = Record<"id" | "role", string>;
export type JwtPayload = JwtParams & PayloadMeta;
export type JwtConfig<T extends string> = Record<T, string> & {
  name: string;
  signOptions: JwtSignOptions;
};
