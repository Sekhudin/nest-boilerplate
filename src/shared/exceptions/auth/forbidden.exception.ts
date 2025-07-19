import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "src/shared/base/base-http.exception";
import { ErrorCode } from "src/shared/enums/error-code.enum";

export class ForbiddenException extends BaseHttpException {
  constructor() {
    super(HttpStatus.FORBIDDEN, ErrorCode.AUTH_FORBIDDEN, {
      auth: [ErrorCode.AUTH_FORBIDDEN],
    });
  }
}
