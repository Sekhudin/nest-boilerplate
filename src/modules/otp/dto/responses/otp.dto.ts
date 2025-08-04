import { Exclude, Expose, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { Otp } from "src/modules/otp/entities/otp.entity";
import { UserDto } from "src/modules/user/dto/responses/user.dto";

export class OtpDto implements Otp {
  @Expose()
  @Type(() => UserDto)
  @ApiProperty()
  user: UserDto;

  @Exclude()
  isUsed: boolean;

  @Exclude()
  token: string;

  @Exclude()
  hashOtp: string;

  @Exclude()
  purpose: "EMAIL_VERIFICATION" | "PASSWORD_RESET" | "SIGNIN";

  @Exclude()
  expiresAt: Date;

  @Exclude()
  createdAt: Date;
}
