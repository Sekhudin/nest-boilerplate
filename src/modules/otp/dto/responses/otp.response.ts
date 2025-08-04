import { Expose, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { BaseSingleResponse } from "src/shared/base/base-single.response";
import { MetadataDto } from "src/shared/dto/metadata.dto";
import { OtpDto } from "./otp.dto";

export class OtpResponse implements BaseSingleResponse<OtpDto> {
  @Expose()
  @Type(() => OtpDto)
  @ApiProperty()
  data: OtpDto;

  @Expose()
  @Type(() => MetadataDto)
  @ApiProperty()
  meta: MetadataDto;

  constructor(value: OtpResponse) {
    Object.assign(this, value);
  }

  static from(data: OtpDto, meta: MetadataDto): OtpResponse {
    return new OtpResponse({ data, meta });
  }
}
