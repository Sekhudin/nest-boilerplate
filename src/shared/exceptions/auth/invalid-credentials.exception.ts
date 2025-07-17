import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "src/shared/base/base-http.exception";
import { ERROR_MESSAGES } from "src/shared/constants/error-messages.constant";
import { ErrorCode } from "src/shared/enums/error-code.enum";

export class InvalidCredentialsException extends BaseHttpException {
  constructor() {
    super(HttpStatus.UNAUTHORIZED, ERROR_MESSAGES[ErrorCode.AUTH_INVALID_CREDENTIALS], {
      auth: [ErrorCode.AUTH_INVALID_CREDENTIALS],
    });
  }
}
