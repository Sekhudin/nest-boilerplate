import { Exclude, Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class SignInTokenDto implements AuthenticationToken {
  @Expose()
  @ApiProperty()
  accessToken: string;

  @Exclude()
  refreshToken: string;
}
