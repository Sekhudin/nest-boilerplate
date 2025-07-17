import { HttpStatus } from "@nestjs/common";
import { ERROR_MESSAGES } from "src/shared/constants/error-messages.constant";
import { ErrorCode } from "src/shared/enums/error-code.enum";
import { PermissionDeniedException } from "./permission-denied.exception";
import { PermissionRoleRequiredException } from "./permission-role-required.exception";

describe("Permission Exceptions", () => {
  it("should create PermissionDeniedException correctly", () => {
    const exception = new PermissionDeniedException();

    expect(exception.getStatus()).toBe(HttpStatus.FORBIDDEN);
    expect(exception.message).toBe(ERROR_MESSAGES[ErrorCode.PERMISSION_DENIED]);

    const response = exception.getResponse() as any;
    expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
    expect(response.message).toBe(ERROR_MESSAGES[ErrorCode.PERMISSION_DENIED]);
    expect(response.errors).toEqual({
      permission: [ErrorCode.PERMISSION_DENIED],
    });
  });

  it("should create PermissionRoleRequiredException correctly", () => {
    const exception = new PermissionRoleRequiredException();

    expect(exception.getStatus()).toBe(HttpStatus.FORBIDDEN);
    expect(exception.message).toBe(ERROR_MESSAGES[ErrorCode.PERMISSION_ROLE_REQUIRED]);

    const response = exception.getResponse() as any;
    expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
    expect(response.message).toBe(ERROR_MESSAGES[ErrorCode.PERMISSION_ROLE_REQUIRED]);
    expect(response.errors).toEqual({
      role: [ErrorCode.PERMISSION_ROLE_REQUIRED],
    });
  });
});
