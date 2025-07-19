import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "src/shared/base/base-http.exception";
import { ErrorCode } from "src/shared/enums/error-code.enum";

export class ResourceLockedException extends BaseHttpException {
  constructor() {
    super(HttpStatus.LOCKED, ErrorCode.RESOURCE_LOCKED, {
      resource: [ErrorCode.RESOURCE_LOCKED],
    });
  }
}
