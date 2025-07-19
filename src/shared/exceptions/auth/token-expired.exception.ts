import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "src/shared/base/base-http.exception";
import { ErrorCode } from "src/shared/enums/error-code.enum";

export class TokenExpiredException extends BaseHttpException {
  constructor() {
    super(HttpStatus.UNAUTHORIZED, ErrorCode.AUTH_TOKEN_EXPIRED, {
      token: [ErrorCode.AUTH_TOKEN_EXPIRED],
    });
  }
}
