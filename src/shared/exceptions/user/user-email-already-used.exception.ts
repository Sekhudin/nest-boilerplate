import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "src/shared/base/base-http.exception";
import { ERROR_MESSAGES } from "src/shared/constants/error-messages.constant";
import { ErrorCode } from "src/shared/enums/error-code.enum";

export class UserEmailAlreadyUsedException extends BaseHttpException {
  constructor() {
    super(HttpStatus.CONFLICT, ERROR_MESSAGES[ErrorCode.USER_EMAIL_ALREADY_USED], {
      email: [ErrorCode.USER_EMAIL_ALREADY_USED],
    });
  }
}
