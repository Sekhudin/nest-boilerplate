import { HttpStatus } from "@nestjs/common";
import { ERROR_MESSAGES } from "src/shared/constants/error-messages.constant";
import { ErrorCode } from "src/shared/enums/error-code.enum";
import { SystemInternalErrorException } from "./system-internal-error.exception";
import { SystemServiceUnavailableException } from "./system-service-unavailable.exception";
import { SystemTimeoutException } from "./system-timeout.exception";
import { SystemUnknownErrorException } from "./system-unknown-error.exception";

describe("System Exceptions", () => {
  it("should create SystemInternalErrorException", () => {
    const exception = new SystemInternalErrorException();
    expect(exception.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(exception.getResponse()).toEqual({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES[ErrorCode.SYSTEM_INTERNAL_ERROR],
      errors: {
        system: [ErrorCode.SYSTEM_INTERNAL_ERROR],
      },
    });
  });

  it("should create SystemServiceUnavailableException", () => {
    const exception = new SystemServiceUnavailableException();
    expect(exception.getStatus()).toBe(HttpStatus.SERVICE_UNAVAILABLE);
    expect(exception.getResponse()).toEqual({
      statusCode: HttpStatus.SERVICE_UNAVAILABLE,
      message: ERROR_MESSAGES[ErrorCode.SYSTEM_SERVICE_UNAVAILABLE],
      errors: {
        system: [ErrorCode.SYSTEM_SERVICE_UNAVAILABLE],
      },
    });
  });

  it("should create SystemTimeoutException", () => {
    const exception = new SystemTimeoutException();
    expect(exception.getStatus()).toBe(HttpStatus.GATEWAY_TIMEOUT);
    expect(exception.getResponse()).toEqual({
      statusCode: HttpStatus.GATEWAY_TIMEOUT,
      message: ERROR_MESSAGES[ErrorCode.SYSTEM_TIMEOUT],
      errors: {
        system: [ErrorCode.SYSTEM_TIMEOUT],
      },
    });
  });

  it("should create SystemUnknownErrorException", () => {
    const exception = new SystemUnknownErrorException();
    expect(exception.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(exception.getResponse()).toEqual({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES[ErrorCode.SYSTEM_UNKNOWN_ERROR],
      errors: {
        system: [ErrorCode.SYSTEM_UNKNOWN_ERROR],
      },
    });
  });
});
