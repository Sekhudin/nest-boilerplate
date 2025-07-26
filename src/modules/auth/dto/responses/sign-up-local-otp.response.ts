import { Expose, Type } from "class-transformer";
import { BaseSingleResponse } from "src/shared/base/base-single.response";
import { SignUpLocalOtpDto } from "./sign-up-local-otp.dto";

export class SignUpLocalOtpResponse implements BaseSingleResponse<SignUpLocalOtpDto> {
  @Expose()
  @Type(() => SignUpLocalOtpDto)
  data: SignUpLocalOtpDto;

  @Expose()
  meta?: Metadata | undefined;

  constructor(value: SignUpLocalOtpResponse) {
    Object.assign(this, value);
  }

  static from(data: SignUpLocalOtpDto, meta?: Metadata): SignUpLocalOtpResponse {
    return new SignUpLocalOtpResponse({ data, meta });
  }
}
