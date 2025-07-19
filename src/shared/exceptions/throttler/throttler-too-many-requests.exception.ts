import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "src/shared/base/base-http.exception";
import { ErrorCode } from "src/shared/enums/error-code.enum";

export class ThrottlerTooManyRequestsException extends BaseHttpException {
  constructor() {
    super(HttpStatus.TOO_MANY_REQUESTS, ErrorCode.THROTTLER_TOO_MANY_REQUESTS, {
      throttler: [ErrorCode.THROTTLER_TOO_MANY_REQUESTS],
    });
  }
}
