import { HttpStatus } from "@nestjs/common";
import { ERROR_MESSAGES } from "src/shared/constants/error-messages.constant";
import { ErrorCode } from "src/shared/enums/error-code.enum";
import { BaseHttpException } from "./base-http.exception";

class ExampleException extends BaseHttpException {
  constructor(errors?: Record<string, string[]>) {
    super(HttpStatus.BAD_REQUEST, ERROR_MESSAGES.VALIDATION_INVALID_FORMAT, errors);
  }
}

describe("BaseHttpException", () => {
  it("should create an exception with message only (no errors)", () => {
    const exception = new ExampleException();

    expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    expect(exception.getResponse()).toEqual({
      statusCode: HttpStatus.BAD_REQUEST,
      message: ERROR_MESSAGES.VALIDATION_INVALID_FORMAT,
    });
  });

  it("should create an exception with message and errors", () => {
    const errors = {
      email: [ErrorCode.VALIDATION_INVALID_FORMAT],
      password: [ErrorCode.VALIDATION_TOO_SHORT],
    };

    const exception = new ExampleException(errors);

    expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    expect(exception.getResponse()).toEqual({
      statusCode: HttpStatus.BAD_REQUEST,
      message: ERROR_MESSAGES.VALIDATION_INVALID_FORMAT,
      errors,
    });
  });

  describe("hasErrors", () => {
    it("should return true if object is exist and not empty object", () => {
      expect(BaseHttpException.hasErrors({ email: [ErrorCode.VALIDATION_INVALID_FORMAT] })).toBe(true);
    });

    it("should return false if object is not exist or empty object", () => {
      expect(BaseHttpException.hasErrors()).toBe(false);
      expect(BaseHttpException.hasErrors({})).toBe(false);
    });
  });
});
