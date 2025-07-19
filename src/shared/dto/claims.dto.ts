import { ErrorCode } from "src/shared/enums/error-code.enum";
import { TokenInvalidException } from "src/shared/exceptions/auth/token-invalid.exception";
import { Schema, schema, z } from "src/utils/validation";
import { payload } from "./payload.dto";

const claims = z.object({
  ...z.object({
    iat: z.number(ErrorCode.NUMBER_INVALID),
    exp: z.number(ErrorCode.NUMBER_INVALID),
    iss: z.string(ErrorCode.STRING_INVALID),
    aud: z.array(z.string(ErrorCode.STRING_INVALID)),
  }).shape,
  ...payload.shape,
});

export class Claims extends Schema(schema(claims, new TokenInvalidException())) {}
