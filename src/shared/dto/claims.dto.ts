import { UnauthorizedException } from "@nestjs/common";
import { Schema, schema, z } from "src/utils/validation";
import { payload } from "./payload.dto";

const claims = z.object({
  ...z.object({
    iat: z.number(),
    exp: z.number(),
    iss: z.string(),
    aud: z.array(z.string()),
  }).shape,
  ...payload.shape,
});

export class Claims extends Schema(schema(claims, new UnauthorizedException("jwt claims invalid"))) {}
