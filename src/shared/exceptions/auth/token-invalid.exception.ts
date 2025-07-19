import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "src/shared/base/base-http.exception";
import { ErrorCode } from "src/shared/enums/error-code.enum";

export class TokenInvalidException extends BaseHttpException {
  constructor() {
    super(HttpStatus.UNAUTHORIZED, ErrorCode.AUTH_TOKEN_INVALID, {
      token: [ErrorCode.AUTH_TOKEN_INVALID],
    });
  }
}
