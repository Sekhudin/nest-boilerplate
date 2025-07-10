import { ApiProperty } from "@nestjs/swagger";
import { Otp } from "src/modules/otp/entities/otp.entity";
import { Schema, schema, z } from "src/utils/validation";

const otpVerify = schema(Otp.dto.pick({ token: true, purpose: true }).extend({ otpCode: z.string().min(1) }));

export class OtpVerifyDto extends Schema(otpVerify) {
  @ApiProperty()
  token: string;

  @ApiProperty({ enum: ["EMAIL_VERIFICATION", "PASSWORD_RESET", "SIGNIN"] })
  purpose: "EMAIL_VERIFICATION" | "PASSWORD_RESET" | "SIGNIN";

  @ApiProperty()
  otpCode: string;
}
