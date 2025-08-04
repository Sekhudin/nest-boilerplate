import { Exclude, Expose, Type } from "class-transformer";
import { Token } from "src/modules/token/entities/token.entity";
import { UserDto } from "src/modules/user/dto/responses/user.dto";

export class TokenDto implements Token {
  @Expose()
  id: string;

  @Expose()
  ipAddress: string;

  @Expose()
  deviceId: string;

  @Expose()
  userAgentString: string;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;

  @Exclude()
  token: string;

  @Exclude()
  revoked: boolean;

  @Exclude()
  createdAt: Date;
}
