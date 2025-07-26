import { Expose, Type } from "class-transformer";
import { BaseSingleResponse } from "src/shared/base/base-single.response";
import { OtpDto } from "./otp.dto";

export class OtpResponse implements BaseSingleResponse<OtpDto> {
  @Expose()
  @Type(() => OtpDto)
  data: OtpDto;

  @Expose()
  meta?: Metadata | undefined;

  constructor(value: OtpResponse) {
    Object.assign(this, value);
  }

  static from(data: OtpDto, meta?: Metadata): OtpResponse {
    return new OtpResponse({ data, meta });
  }
}
