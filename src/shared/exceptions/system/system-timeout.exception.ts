import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "src/shared/base/base-http.exception";
import { ErrorCode } from "src/shared/enums/error-code.enum";

export class SystemTimeoutException extends BaseHttpException {
  constructor() {
    super(HttpStatus.GATEWAY_TIMEOUT, ErrorCode.SYSTEM_TIMEOUT, {
      system: [ErrorCode.SYSTEM_TIMEOUT],
    });
  }
}
