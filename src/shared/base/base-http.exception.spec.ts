import { HttpStatus } from "@nestjs/common";
import { ErrorCode } from "src/shared/enums/error-code.enum";
import { BaseHttpException } from "./base-http.exception";

class ExampleException extends BaseHttpException {
  constructor(errors?: Record<string, string[]>) {
    super(HttpStatus.BAD_REQUEST, ErrorCode.VALIDATION_FAILED, errors);
  }
}

describe("BaseHttpException", () => {
  it("should create an exception with message only (no errors)", () => {
    const exception = new ExampleException();

    expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    expect(exception.getResponse()).toEqual({
      statusCode: HttpStatus.BAD_REQUEST,
      message: ErrorCode.VALIDATION_FAILED,
    });
  });

  it("should create an exception with message and errors", () => {
    const errors = {
      email: [ErrorCode.STRING_INVALID_EMAIL],
      password: [ErrorCode.PASSWORD_WEAK],
    };

    const exception = new ExampleException(errors);

    expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    expect(exception.getResponse()).toEqual({
      statusCode: HttpStatus.BAD_REQUEST,
      message: ErrorCode.VALIDATION_FAILED,
      errors,
    });
  });

  describe("hasErrors", () => {
    it("should return true if object is exist and not empty object", () => {
      expect(BaseHttpException.hasErrors({ email: [ErrorCode.VALIDATION_FAILED] })).toBe(true);
    });

    it("should return false if object is not exist or empty object", () => {
      expect(BaseHttpException.hasErrors()).toBe(false);
      expect(BaseHttpException.hasErrors({})).toBe(false);
    });
  });
});
