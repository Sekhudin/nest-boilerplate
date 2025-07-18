import { TokenInvalidException } from "src/shared/exceptions/auth/token-invalid.exception";
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

export class Claims extends Schema(schema(claims, new TokenInvalidException())) {}
