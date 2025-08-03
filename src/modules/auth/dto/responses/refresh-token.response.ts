import { Expose, Type } from "class-transformer";
import { BaseSingleResponse } from "src/shared/base/base-single.response";
import { RefreshTokenDto } from "./refresh-token.dto";

export class RefreshTokenResponse implements BaseSingleResponse<RefreshTokenDto> {
  @Expose()
  @Type(() => RefreshTokenDto)
  data: RefreshTokenDto;

  @Expose()
  meta?: Metadata;

  constructor(value: RefreshTokenResponse) {
    Object.assign(this, value);
  }

  static from(data: RefreshTokenDto, meta?: Metadata): RefreshTokenResponse {
    return new RefreshTokenResponse({ data, meta });
  }
}
