import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "src/shared/base/base-http.exception";
import { ErrorCode } from "src/shared/enums/error-code.enum";

export class UserEmailAlreadyUsedException extends BaseHttpException {
  constructor() {
    super(HttpStatus.CONFLICT, ErrorCode.USER_EMAIL_ALREADY_USED, {
      email: [ErrorCode.USER_EMAIL_ALREADY_USED],
    });
  }
}
