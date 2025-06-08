import { InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { Dto, schema, z, zr } from "src/utils/validation";

const payload = z.object({
  sub: zr.string(),
  username: zr.string(),
  email: zr.email(),
  roles: z.array(zr.string()),
  provider: zr.string(),
  deviceId: zr.string(),
});

const claims = z.object({
  ...z.object({
    iat: z.number(),
    exp: z.number(),
    iss: z.string(),
    aud: z.array(z.string()),
  }).shape,
  ...payload.shape,
});

export const payloadSchema = schema(payload, new InternalServerErrorException("invalid jwt payload."));
export const claimsSchema = schema(claims, new UnauthorizedException("jwt claims invalid"));

export type JwtPayload = Dto<typeof payloadSchema>;
export type JwtClaims = Dto<typeof claimsSchema>;
