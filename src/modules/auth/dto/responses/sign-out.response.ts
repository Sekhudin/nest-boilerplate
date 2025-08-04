import { Expose, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { BaseSingleResponse } from "src/shared/base/base-single.response";
import { MetadataDto } from "src/shared/dto/metadata.dto";
import { TokenDto } from "src/modules/token/dto/responses/token.dto";

export class SignOutResponse implements BaseSingleResponse<TokenDto> {
  @Expose()
  @Type(() => TokenDto)
  @ApiProperty()
  data: TokenDto;

  @Expose()
  @Type(() => MetadataDto)
  @ApiProperty()
  meta: MetadataDto;

  constructor(value: SignOutResponse) {
    Object.assign(this, value);
  }

  static from(data: TokenDto, meta: MetadataDto): SignOutResponse {
    return new SignOutResponse({ data, meta });
  }
}
