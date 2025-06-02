import { InternalServerErrorException } from "@nestjs/common";
import { z } from "zod";
import { Dto, schema, zr } from "src/utils/schema";

export const jwtPayload = schema(
  z.object({
    sub: zr.string(),
    username: zr.string(),
    email: zr.email(),
    roles: z.array(zr.string()),
    provider: zr.string(),
    deviceId: zr.string(),
  }),
  () => new InternalServerErrorException("invalid jwt payload."),
);

export type JwtPayload = Dto<typeof jwtPayload>;
export type JwtClaims = JwtPayload & {
  iat: number;
  exp: number;
  iss: string;
  aud: string[];
};
