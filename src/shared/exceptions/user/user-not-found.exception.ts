import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "src/shared/base/base-http.exception";
import { ERROR_MESSAGES } from "src/shared/constants/error-messages.constant";
import { ErrorCode } from "src/shared/enums/error-code.enum";

export class UserNotFoundException extends BaseHttpException {
  constructor() {
    super(HttpStatus.NOT_FOUND, ERROR_MESSAGES[ErrorCode.USER_NOT_FOUND], {
      user: [ErrorCode.USER_NOT_FOUND],
    });
  }
}
