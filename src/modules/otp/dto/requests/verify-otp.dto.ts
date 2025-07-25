import { ApiProperty } from "@nestjs/swagger";
import { ErrorCode } from "src/shared/enums/error-code.enum";
import { Otp } from "src/modules/otp/entities/otp.entity";
import { Schema, schema, z } from "src/utils/validation";

const verifyOtp = schema(
  Otp.dto
    .pick({ token: true, purpose: true })
    .extend({ otpCode: z.string(ErrorCode.STRING_INVALID).min(1, ErrorCode.STRING_EMPTY) }),
);

export class VerifyOtpDto extends Schema(verifyOtp) {
  @ApiProperty()
  token: string;

  @ApiProperty({ enum: ["EMAIL_VERIFICATION", "PASSWORD_RESET", "SIGNIN"] })
  purpose: "EMAIL_VERIFICATION" | "PASSWORD_RESET" | "SIGNIN";

  @ApiProperty()
  otpCode: string;
}
