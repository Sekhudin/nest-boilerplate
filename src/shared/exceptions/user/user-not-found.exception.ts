import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "src/shared/base/base-http.exception";
import { ErrorCode } from "src/shared/enums/error-code.enum";

export class UserNotFoundException extends BaseHttpException {
  constructor() {
    super(HttpStatus.NOT_FOUND, ErrorCode.USER_NOT_FOUND, {
      user: [ErrorCode.USER_NOT_FOUND],
    });
  }
}
