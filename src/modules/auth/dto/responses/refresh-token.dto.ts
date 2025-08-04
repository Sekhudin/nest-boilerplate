import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class RefreshTokenDto implements Pick<AuthenticationToken, "accessToken"> {
  @Expose()
  @ApiProperty()
  accessToken: string;
}
