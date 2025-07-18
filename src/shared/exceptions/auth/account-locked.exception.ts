import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "src/shared/base/base-http.exception";
import { ERROR_MESSAGES } from "src/shared/constants/error-messages.constant";
import { ErrorCode } from "src/shared/enums/error-code.enum";

export class AccountLockedException extends BaseHttpException {
  constructor() {
    super(HttpStatus.FORBIDDEN, ERROR_MESSAGES[ErrorCode.AUTH_ACCOUNT_LOCKED], {
      auth: [ErrorCode.AUTH_FORBIDDEN, ErrorCode.AUTH_ACCOUNT_LOCKED],
    });
  }
}
