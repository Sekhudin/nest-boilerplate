import { ApiProperty } from "@nestjs/swagger";
import { Otp } from "src/modules/otp/entities/otp.entity";
import { Schema, schema } from "src/utils/validation";

const otpVerifyLink = schema(Otp.dto.pick({ token: true, purpose: true }));

export class OtpVerifyLinkDto extends Schema(otpVerifyLink) {
  @ApiProperty()
  token: string;

  @ApiProperty({ enum: ["EMAIL_VERIFICATION", "PASSWORD_RESET", "SIGNIN"] })
  purpose: "EMAIL_VERIFICATION" | "PASSWORD_RESET" | "SIGNIN";
}
