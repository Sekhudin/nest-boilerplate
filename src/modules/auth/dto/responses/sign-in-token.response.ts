import { Expose, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { BaseSingleResponse } from "src/shared/base/base-single.response";
import { MetadataDto } from "src/shared/dto/metadata.dto";
import { SignInTokenDto } from "./sign-in-token.dto";

export class SignInTokenResponse implements BaseSingleResponse<SignInTokenDto> {
  @Expose()
  @Type(() => SignInTokenDto)
  @ApiProperty()
  data: SignInTokenDto;

  @Expose()
  @Type(() => MetadataDto)
  @ApiProperty()
  meta: MetadataDto;

  constructor(value: SignInTokenResponse) {
    Object.assign(this, value);
  }

  static from(data: SignInTokenDto, meta: MetadataDto): SignInTokenResponse {
    return new SignInTokenResponse({ data, meta });
  }
}
