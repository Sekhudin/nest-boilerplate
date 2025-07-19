import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "src/shared/base/base-http.exception";
import { ErrorCode } from "src/shared/enums/error-code.enum";

export class SystemInternalErrorException extends BaseHttpException {
  constructor() {
    super(HttpStatus.INTERNAL_SERVER_ERROR, ErrorCode.SYSTEM_INTERNAL_ERROR, {
      system: [ErrorCode.SYSTEM_INTERNAL_ERROR],
    });
  }
}
