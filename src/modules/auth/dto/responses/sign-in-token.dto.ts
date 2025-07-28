import { Exclude, Expose } from "class-transformer";

export class SignInTokenDto implements AuthenticationToken {
  @Expose()
  accessToken: string;

  @Exclude()
  refreshToken: string;
}
