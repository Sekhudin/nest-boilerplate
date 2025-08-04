import { Expose, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { BaseSingleResponse } from "src/shared/base/base-single.response";
import { MetadataDto } from "src/shared/dto/metadata.dto";
import { SignUpLocalOtpDto } from "./sign-up-local-otp.dto";

export class SignUpLocalOtpResponse implements BaseSingleResponse<SignUpLocalOtpDto> {
  @Expose()
  @Type(() => SignUpLocalOtpDto)
  @ApiProperty()
  data: SignUpLocalOtpDto;

  @Expose()
  @Type(() => MetadataDto)
  @ApiProperty()
  meta: MetadataDto;

  constructor(value: SignUpLocalOtpResponse) {
    Object.assign(this, value);
  }

  static from(data: SignUpLocalOtpDto, meta: MetadataDto): SignUpLocalOtpResponse {
    return new SignUpLocalOtpResponse({ data, meta });
  }
}
