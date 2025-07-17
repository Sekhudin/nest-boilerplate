import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "src/shared/base/base-http.exception";
import { ERROR_MESSAGES } from "src/shared/constants/error-messages.constant";
import { ErrorCode } from "src/shared/enums/error-code.enum";

export class OtpExpiredException extends BaseHttpException {
  constructor() {
    super(HttpStatus.BAD_REQUEST, ERROR_MESSAGES[ErrorCode.OTP_EXPIRED], {
      otp: [ErrorCode.OTP_EXPIRED],
    });
  }
}
