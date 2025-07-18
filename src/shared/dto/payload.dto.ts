import { SystemInternalErrorException } from "src/shared/exceptions/system/system-internal-error.exception";
import { Schema, schema, z } from "src/utils/validation";

export const payload = z.object({
  sub: z.string(),
  username: z.string(),
  email: z.email(),
  roles: z.array(z.string()),
  provider: z.string(),
  deviceId: z.string(),
});

export class Payload extends Schema(schema(payload, new SystemInternalErrorException())) {}
