import { Expose, Type } from "class-transformer";
import { BaseSingleResponse } from "src/shared/base/base-single.response";
import { TokenDto } from "src/modules/token/dto/responses/token.dto";

export class SignOutResponse implements BaseSingleResponse<TokenDto> {
  @Expose()
  @Type(() => TokenDto)
  data: TokenDto;

  @Expose()
  meta?: Metadata;

  constructor(value: SignOutResponse) {
    Object.assign(this, value);
  }

  static from(data: TokenDto, meta?: Metadata): SignOutResponse {
    return new SignOutResponse({ data, meta });
  }
}
