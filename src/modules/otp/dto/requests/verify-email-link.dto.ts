import { ApiProperty } from "@nestjs/swagger";
import { ErrorCode } from "src/shared/enums/error-code.enum";
import { Otp } from "src/modules/otp/entities/otp.entity";
import { Schema, schema, z } from "src/utils/validation";

const verifyEmailLink = schema(
  Otp.dto.pick({ token: true }).extend({ purpose: z.enum(["EMAIL_VERIFICATION"], ErrorCode.ENUM_INVALID) }),
);

export class VerifyEmailLinkDto extends Schema(verifyEmailLink) {
  @ApiProperty()
  token: string;

  @ApiProperty({ enum: ["EMAIL_VERIFICATION"] })
  purpose: "EMAIL_VERIFICATION";
}
