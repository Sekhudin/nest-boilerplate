import { HttpStatus } from "@nestjs/common";
import { ErrorCode } from "src/shared/enums/error-code.enum";
import { ResourceConflictException } from "./resource-conflict.exception";
import { ResourceLockedException } from "./resource-locked.exception";
import { ResourceNotFoundException } from "./resource-not-found.exception";

describe("Resource Exceptions", () => {
  it("should create ResourceNotFoundException", () => {
    const exception = new ResourceNotFoundException();
    expect(exception.getStatus()).toBe(HttpStatus.NOT_FOUND);
    expect(exception.getResponse()).toEqual({
      statusCode: HttpStatus.NOT_FOUND,
      message: ErrorCode.RESOURCE_NOT_FOUND,
      errors: { resource: [ErrorCode.RESOURCE_NOT_FOUND] },
    });
  });

  it("should create ResourceConflictException", () => {
    const exception = new ResourceConflictException();
    expect(exception.getStatus()).toBe(HttpStatus.CONFLICT);
    expect(exception.getResponse()).toEqual({
      statusCode: HttpStatus.CONFLICT,
      message: ErrorCode.RESOURCE_CONFLICT,
      errors: { resource: [ErrorCode.RESOURCE_CONFLICT] },
    });
  });

  it("should create ResourceLockedException", () => {
    const exception = new ResourceLockedException();
    expect(exception.getStatus()).toBe(HttpStatus.LOCKED);
    expect(exception.getResponse()).toEqual({
      statusCode: HttpStatus.LOCKED,
      message: ErrorCode.RESOURCE_LOCKED,
      errors: { resource: [ErrorCode.RESOURCE_LOCKED] },
    });
  });
});
