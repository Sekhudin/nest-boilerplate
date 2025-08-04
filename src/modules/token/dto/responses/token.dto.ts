import { Exclude, Expose, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { Token } from "src/modules/token/entities/token.entity";
import { UserDto } from "src/modules/user/dto/responses/user.dto";

export class TokenDto implements Token {
  @Expose()
  @ApiProperty()
  ipAddress: string;

  @Expose()
  @ApiProperty()
  deviceId: string;

  @Expose()
  @ApiProperty()
  userAgentString: string;

  @Expose()
  @Type(() => UserDto)
  @ApiProperty()
  user: UserDto;

  @Exclude()
  id: string;

  @Exclude()
  token: string;

  @Exclude()
  revoked: boolean;

  @Exclude()
  createdAt: Date;
}
