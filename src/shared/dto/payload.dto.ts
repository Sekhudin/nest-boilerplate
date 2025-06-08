import { InternalServerErrorException } from "@nestjs/common";
import { Schema, schema, z, zr } from "src/utils/validation";

export const payload = z.object({
  sub: zr.string(),
  username: zr.string(),
  email: zr.email(),
  roles: z.array(zr.string()),
  provider: zr.string(),
  deviceId: zr.string(),
});

export class Payload extends Schema(
  schema(payload, new InternalServerErrorException("invalid jwt payload.")),
) {}
