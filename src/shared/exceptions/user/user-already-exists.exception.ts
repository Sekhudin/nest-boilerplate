import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "src/shared/base/base-http.exception";
import { ERROR_MESSAGES } from "src/shared/constants/error-messages.constant";
import { ErrorCode } from "src/shared/enums/error-code.enum";

export class UserAlreadyExistsException extends BaseHttpException {
  constructor() {
    super(HttpStatus.CONFLICT, ERROR_MESSAGES[ErrorCode.USER_ALREADY_EXISTS], {
      user: [ErrorCode.USER_ALREADY_EXISTS],
    });
  }
}
