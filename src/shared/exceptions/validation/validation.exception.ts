import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "src/shared/base/base-http.exception";
import { ErrorCode } from "src/shared/enums/error-code.enum";

export class ValidationException extends BaseHttpException {
  constructor(errors?: Record<string, string[]>) {
    super(HttpStatus.BAD_REQUEST, ErrorCode.VALIDATION_FAILED, errors ?? { validation: [ErrorCode.VALIDATION_FAILED] });
  }
}
