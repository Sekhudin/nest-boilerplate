import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "src/shared/base/base-http.exception";
import { ERROR_MESSAGES } from "src/shared/constants/error-messages.constant";
import { ErrorCode } from "src/shared/enums/error-code.enum";

export class SystemServiceUnavailableException extends BaseHttpException {
  constructor() {
    super(HttpStatus.SERVICE_UNAVAILABLE, ERROR_MESSAGES[ErrorCode.SYSTEM_SERVICE_UNAVAILABLE], {
      system: [ErrorCode.SYSTEM_SERVICE_UNAVAILABLE],
    });
  }
}
