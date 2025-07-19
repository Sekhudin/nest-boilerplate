import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "src/shared/base/base-http.exception";
import { ErrorCode } from "src/shared/enums/error-code.enum";

export class PermissionDeniedException extends BaseHttpException {
  constructor() {
    super(HttpStatus.FORBIDDEN, ErrorCode.PERMISSION_DENIED, {
      permission: [ErrorCode.PERMISSION_DENIED],
    });
  }
}
