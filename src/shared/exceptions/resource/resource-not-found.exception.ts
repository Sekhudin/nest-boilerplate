import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "src/shared/base/base-http.exception";
import { ErrorCode } from "src/shared/enums/error-code.enum";

export class ResourceNotFoundException extends BaseHttpException {
  constructor() {
    super(HttpStatus.NOT_FOUND, ErrorCode.RESOURCE_NOT_FOUND, {
      resource: [ErrorCode.RESOURCE_NOT_FOUND],
    });
  }
}
