import { Exclude, Expose } from "class-transformer";
import { Otp } from "src/modules/otp/entities/otp.entity";
import { User } from "src/modules/user/entities/user.entity";

export class OtpDto implements Otp {
  @Exclude()
  token: string;

  @Exclude()
  hashOtp: string;

  @Exclude()
  user: User;

  @Exclude()
  purpose: "EMAIL_VERIFICATION" | "PASSWORD_RESET" | "SIGNIN";

  @Expose()
  isUsed: boolean;

  @Exclude()
  expiresAt: Date;

  @Exclude()
  createdAt: Date;
}
