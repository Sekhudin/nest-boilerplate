import { HttpStatus } from "@nestjs/common";
import { ErrorCode } from "src/shared/enums/error-code.enum";
import { ValidationException } from "./validation.exception";

describe("ValidationException", () => {
  it("should create with custom errors", () => {
    const errors = { email: [ErrorCode.VALIDATION_FAILED] };
    const exception = new ValidationException(errors);

    expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    expect(exception.message).toBe(ErrorCode.VALIDATION_FAILED);
    expect(exception.getResponse()).toEqual({
      statusCode: HttpStatus.BAD_REQUEST,
      message: ErrorCode.VALIDATION_FAILED,
      errors,
    });
  });

  it("should create with default error when no errors provided", () => {
    const exception = new ValidationException();

    expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    expect(exception.message).toBe(ErrorCode.VALIDATION_FAILED);
    expect(exception.getResponse()).toEqual({
      statusCode: HttpStatus.BAD_REQUEST,
      message: ErrorCode.VALIDATION_FAILED,
      errors: {
        validation: [ErrorCode.VALIDATION_FAILED],
      },
    });
  });
});
