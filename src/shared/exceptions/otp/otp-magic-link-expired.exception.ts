import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "src/shared/base/base-http.exception";
import { ErrorCode } from "src/shared/enums/error-code.enum";

export class OtpMagicLinkExpiredException extends BaseHttpException {
  constructor() {
    super(HttpStatus.BAD_REQUEST, ErrorCode.OTP_MAGIC_LINK_EXPIRED, {
      magicLink: [ErrorCode.OTP_MAGIC_LINK_EXPIRED],
    });
  }
}
