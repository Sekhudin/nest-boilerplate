import { Exclude, Expose, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { Otp } from "src/modules/otp/entities/otp.entity";
import { UserDto } from "src/modules/user/dto/responses/user.dto";

export class SignUpLocalOtpDto implements Otp {
  @Expose()
  @ApiProperty()
  token: string;

  @Expose()
  @ApiProperty()
  purpose: "EMAIL_VERIFICATION" | "PASSWORD_RESET" | "SIGNIN";

  @Expose()
  @ApiProperty()
  expiresAt: Date;

  @Exclude()
  user: UserDto;

  @Exclude()
  hashOtp: string;

  @Exclude()
  isUsed: boolean;

  @Exclude()
  createdAt: Date;
}
