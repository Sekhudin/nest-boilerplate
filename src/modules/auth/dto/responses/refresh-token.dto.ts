import { Expose } from "class-transformer";

export class RefreshTokenDto implements Pick<AuthenticationToken, "accessToken"> {
  @Expose()
  accessToken: string;
}
