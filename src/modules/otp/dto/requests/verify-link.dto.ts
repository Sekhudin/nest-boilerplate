import { ApiProperty } from "@nestjs/swagger";
import { Otp } from "src/modules/otp/entities/otp.entity";
import { Schema, schema } from "src/utils/validation";

const verifyLink = schema(Otp.dto.pick({ token: true, purpose: true }));

export class VerifyLinkDto extends Schema(verifyLink) {
  @ApiProperty()
  token: string;

  @ApiProperty({ enum: ["EMAIL_VERIFICATION", "PASSWORD_RESET", "SIGNIN"] })
  purpose: "EMAIL_VERIFICATION" | "PASSWORD_RESET" | "SIGNIN";
}
