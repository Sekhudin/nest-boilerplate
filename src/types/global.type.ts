import type { CookieOptions } from "express";
import type { ApiOperationOptions } from "@nestjs/swagger";
import type { JwtSignOptions, JwtVerifyOptions } from "@nestjs/jwt";

export type Docs<T extends string> = Record<T, ApiOperationOptions>;
export type Nullable<T extends unknown> = T | null;

type JwtPayloadMeta = Record<"iat" | "exp", string>;
export type JwtAuthParams = Record<"id" | "role", string>;
export type JwtAuthPayload = JwtAuthParams & JwtPayloadMeta;
export type JwtParams = Record<"id", string>;
export type JwtPayload = JwtParams & JwtPayloadMeta;
export type JwtConfig<T extends string> = Record<T, string> & {
  name: string;
  signOptions: JwtSignOptions;
  verifyOptions?: JwtVerifyOptions;
};

export type CookieConfig<T extends string> = Record<T, string> & {
  options: CookieOptions;
};
