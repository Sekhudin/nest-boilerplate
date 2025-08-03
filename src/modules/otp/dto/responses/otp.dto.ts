import { Exclude, Expose, Type } from "class-transformer";
import { Otp } from "src/modules/otp/entities/otp.entity";
import { UserDto } from "src/modules/user/dto/responses/user.dto";

export class OtpDto implements Otp {
  @Expose()
  isUsed: boolean;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;

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
