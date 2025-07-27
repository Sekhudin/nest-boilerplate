import { Exclude, Expose } from "class-transformer";

export class SignInTokenDto {
  @Expose()
  accessToken: string;

  @Exclude()
  refreshToken: string;
}
