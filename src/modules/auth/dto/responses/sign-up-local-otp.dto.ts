import { Exclude, Expose } from "class-transformer";
import { Otp } from "src/modules/otp/entities/otp.entity";
import { User } from "src/modules/user/entities/user.entity";

export class SignUpLocalOtpDto implements Otp {
  @Expose()
  token: string;

  @Expose()
  purpose: "EMAIL_VERIFICATION" | "PASSWORD_RESET" | "SIGNIN";

  @Expose()
  expiresAt: Date;

  @Exclude()
  user: User;

  @Exclude()
  hashOtp: string;

  @Exclude()
  isUsed: boolean;

  @Exclude()
  createdAt: Date;
}
