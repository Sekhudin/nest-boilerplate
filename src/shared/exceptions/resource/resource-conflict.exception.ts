import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "src/shared/base/base-http.exception";
import { ErrorCode } from "src/shared/enums/error-code.enum";

export class ResourceConflictException extends BaseHttpException {
  constructor() {
    super(HttpStatus.CONFLICT, ErrorCode.RESOURCE_CONFLICT, {
      resource: [ErrorCode.RESOURCE_CONFLICT],
    });
  }
}
