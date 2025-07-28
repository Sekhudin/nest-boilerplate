import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "src/shared/base/base-http.exception";
import { ErrorCode } from "src/shared/enums/error-code.enum";

export class UserAuthenticationFailedException extends BaseHttpException {
  constructor() {
    super(HttpStatus.UNAUTHORIZED, ErrorCode.USER_INVALID_CREDENTIAL, {
      user: [ErrorCode.USER_INVALID_CREDENTIAL],
    });
  }
}
