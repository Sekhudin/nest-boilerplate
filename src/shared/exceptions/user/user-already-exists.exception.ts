import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "src/shared/base/base-http.exception";
import { ErrorCode } from "src/shared/enums/error-code.enum";

export class UserAlreadyExistsException extends BaseHttpException {
  constructor() {
    super(HttpStatus.CONFLICT, ErrorCode.USER_ALREADY_EXISTS, {
      user: [ErrorCode.USER_ALREADY_EXISTS],
    });
  }
}
