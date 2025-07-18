import { ERROR_MESSAGES } from "src/shared/constants/error-messages.constant";
import { ErrorCode } from "src/shared/enums/error-code.enum";
import { ThrottlerTooManyRequestsException } from "./throttler-too-many-requests.exception";

describe("ThrottlerTooManyRequestsException", () => {
  it("should have correct properties", () => {
    const exception = new ThrottlerTooManyRequestsException();

    expect(exception.getStatus()).toBe(429);
    expect(exception.message).toBe(ERROR_MESSAGES[ErrorCode.THROTTLER_TOO_MANY_REQUESTS]);
    expect(exception.getResponse()).toEqual({
      statusCode: 429,
      message: ERROR_MESSAGES[ErrorCode.THROTTLER_TOO_MANY_REQUESTS],
      errors: {
        throttler: [ErrorCode.THROTTLER_TOO_MANY_REQUESTS],
      },
    });
  });
});
