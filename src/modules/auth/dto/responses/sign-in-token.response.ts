import { Expose, Type } from "class-transformer";
import { BaseSingleResponse } from "src/shared/base/base-single.response";
import { SignInTokenDto } from "./sign-in-token.dto";

export class SignInTokenResponse implements BaseSingleResponse<SignInTokenDto> {
  @Expose()
  @Type(() => SignInTokenDto)
  data: SignInTokenDto;

  @Expose()
  meta?: Metadata | undefined;

  constructor(value: SignInTokenResponse) {
    Object.assign(this, value);
  }

  static from(data: SignInTokenDto, meta?: Metadata): SignInTokenResponse {
    return new SignInTokenResponse({ data, meta });
  }
}
