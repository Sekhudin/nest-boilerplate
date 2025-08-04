import { Expose, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { BaseSingleResponse } from "src/shared/base/base-single.response";
import { MetadataDto } from "src/shared/dto/metadata.dto";
import { RefreshTokenDto } from "./refresh-token.dto";

export class RefreshTokenResponse implements BaseSingleResponse<RefreshTokenDto> {
  @Expose()
  @Type(() => RefreshTokenDto)
  @ApiProperty()
  data: RefreshTokenDto;

  @Expose()
  @Type(() => MetadataDto)
  @ApiProperty()
  meta: MetadataDto;

  constructor(value: RefreshTokenResponse) {
    Object.assign(this, value);
  }

  static from(data: RefreshTokenDto, meta: MetadataDto): RefreshTokenResponse {
    return new RefreshTokenResponse({ data, meta });
  }
}
