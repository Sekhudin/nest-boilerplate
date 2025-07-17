import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "src/shared/base/base-http.exception";
import { ERROR_MESSAGES } from "src/shared/constants/error-messages.constant";
import { ErrorCode } from "src/shared/enums/error-code.enum";

export class SystemInternalErrorException extends BaseHttpException {
  constructor() {
    super(HttpStatus.INTERNAL_SERVER_ERROR, ERROR_MESSAGES[ErrorCode.SYSTEM_INTERNAL_ERROR], {
      system: [ErrorCode.SYSTEM_INTERNAL_ERROR],
    });
  }
}
