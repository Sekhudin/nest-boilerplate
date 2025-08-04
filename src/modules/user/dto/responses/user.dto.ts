import { Exclude, Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { AuthHistory } from "src/modules/auth-history/entities/auth-history.entity";
import { Otp } from "src/modules/otp/entities/otp.entity";
import { Role } from "src/modules/role/entities/role.entity";
import { Token } from "src/modules/token/entities/token.entity";
import { UserAuth } from "src/modules/user-auth/entities/user-auth.entity";
import { User } from "src/modules/user/entities/user.entity";

export class UserDto implements User {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Exclude()
  isActive: boolean;

  @Exclude()
  isEmailVerified: boolean;

  @Exclude()
  role: Role[];

  @Exclude()
  authMethod: UserAuth;

  @Exclude()
  authHistories: AuthHistory[];

  @Exclude()
  tokens: Token[];

  @Exclude()
  otps: Otp[];

  @Exclude()
  timestamp: Date;

  @Exclude()
  updatedAt: Date;
}
