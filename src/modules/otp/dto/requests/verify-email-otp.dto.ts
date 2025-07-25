import { ApiProperty } from "@nestjs/swagger";
import { ErrorCode } from "src/shared/enums/error-code.enum";
import { Otp } from "src/modules/otp/entities/otp.entity";
import { Schema, schema, z } from "src/utils/validation";

const verifyEmailOtp = schema(
  Otp.dto.pick({ token: true }).extend({
    otpCode: z.string(ErrorCode.STRING_INVALID).min(1, ErrorCode.STRING_EMPTY),
    purpose: z.enum(["EMAIL_VERIFICATION"], ErrorCode.ENUM_INVALID),
  }),
);

export class VerifyEmailOtpDto extends Schema(verifyEmailOtp) {
  @ApiProperty()
  token: string;

  @ApiProperty({ enum: ["EMAIL_VERIFICATION"] })
  purpose: "EMAIL_VERIFICATION";

  @ApiProperty()
  otpCode: string;
}
