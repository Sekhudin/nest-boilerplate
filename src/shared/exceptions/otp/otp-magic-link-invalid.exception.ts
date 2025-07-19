import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "src/shared/base/base-http.exception";
import { ErrorCode } from "src/shared/enums/error-code.enum";

export class OtpMagicLinkInvalidException extends BaseHttpException {
  constructor() {
    super(HttpStatus.BAD_REQUEST, ErrorCode.OTP_MAGIC_LINK_INVALID, {
      magicLink: [ErrorCode.OTP_MAGIC_LINK_INVALID],
    });
  }
}
