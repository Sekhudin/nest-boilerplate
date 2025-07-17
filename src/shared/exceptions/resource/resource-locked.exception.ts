import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "src/shared/base/base-http.exception";
import { ERROR_MESSAGES } from "src/shared/constants/error-messages.constant";
import { ErrorCode } from "src/shared/enums/error-code.enum";

export class ResourceLockedException extends BaseHttpException {
  constructor() {
    super(HttpStatus.LOCKED, ERROR_MESSAGES[ErrorCode.RESOURCE_LOCKED], {
      resource: [ErrorCode.RESOURCE_LOCKED],
    });
  }
}
