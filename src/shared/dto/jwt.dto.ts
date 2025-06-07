import { InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { z } from "zod";
import { Dto, schema, zr } from "src/utils/validation";

const payloadSchema = z.object({
  sub: zr.string(),
  username: zr.string(),
  email: zr.email(),
  roles: z.array(zr.string()),
  provider: zr.string(),
  deviceId: zr.string(),
});

const claimsSchema = payloadSchema.merge(
  z.object({
    iat: z.number(),
    exp: z.number(),
    iss: z.string(),
    aud: z.array(z.string()),
  }),
);

export const jwtPayloadDto = schema(payloadSchema, new InternalServerErrorException("invalid jwt payload."));
export const jwtClaimsDto = schema(claimsSchema, new UnauthorizedException("jwt claims invalid"));

export type JwtPayload = Dto<typeof payloadSchema>;
export type JwtClaims = Dto<typeof claimsSchema>;
