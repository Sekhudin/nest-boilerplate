import { ErrorCode } from "src/shared/enums/error-code.enum";
import { SystemInternalErrorException } from "src/shared/exceptions/system/system-internal-error.exception";
import { Schema, schema, z } from "src/utils/validation";

export const payload = z.object({
  sub: z.string(ErrorCode.STRING_INVALID),
  email: z.email(ErrorCode.STRING_INVALID_EMAIL),
  roles: z.array(z.string(ErrorCode.STRING_INVALID)),
  provider: z.string(ErrorCode.STRING_INVALID),
  deviceId: z.string(ErrorCode.STRING_INVALID),
});

export class Payload extends Schema(schema(payload, new SystemInternalErrorException())) {}
