import { HttpStatus } from "@nestjs/common";
import { BaseHttpException } from "src/shared/base/base-http.exception";
import { ErrorCode } from "src/shared/enums/error-code.enum";

export class PermissionRoleRequiredException extends BaseHttpException {
  constructor() {
    super(HttpStatus.FORBIDDEN, ErrorCode.PERMISSION_ROLE_REQUIRED, {
      role: [ErrorCode.PERMISSION_ROLE_REQUIRED],
    });
  }
}
