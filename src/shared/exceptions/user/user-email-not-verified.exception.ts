import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "src/shared/base/base-http.exception";
import { ErrorCode } from "src/shared/enums/error-code.enum";

export class UserEmailNotVerifiedException extends BaseHttpException {
  constructor() {
    super(HttpStatus.FORBIDDEN, ErrorCode.USER_EMAIL_NOT_VERIFIED, {
      email: [ErrorCode.USER_EMAIL_NOT_VERIFIED],
    });
  }
}
