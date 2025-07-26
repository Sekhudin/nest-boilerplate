import { Expose, Type } from "class-transformer";
import { BaseSingleResponse } from "src/shared/base/base-single.response";
import { OtpDto } from "./otp.dto";

export class OtpSingleResponse implements BaseSingleResponse<OtpDto> {
  @Expose()
  @Type(() => OtpDto)
  data: OtpDto;

  @Expose()
  meta?: Metadata | undefined;

  constructor(value: OtpSingleResponse) {
    Object.assign(this, value);
  }

  static from(data: OtpDto, meta?: Metadata): OtpSingleResponse {
    return new OtpSingleResponse({ data, meta });
  }
}
