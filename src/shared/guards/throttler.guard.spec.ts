import { ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { ThrottlerTooManyRequestsException } from "src/shared/exceptions/throttler/throttler-too-many-requests.exception";
import { ThrottlerGuard } from "./throttler.guard";

describe("ThrottlerGuard", () => {
  let guard: ThrottlerGuard;

  beforeEach(() => {
    guard = new ThrottlerGuard(null as any, null as any, null as any);
  });

  describe("throw ThrottlingException", () => {
    it("should throw HttpException with correct structure", async () => {
      try {
        // @ts-expect-error – kita sengaja panggil protected method untuk test
        await guard.throwThrottlingException({} as ExecutionContext);
        fail("Expected exception to be thrown");
      } catch (e) {
        const error = e as HttpException;
        expect(error).toBeInstanceOf(ThrottlerTooManyRequestsException);
        expect(error.getStatus()).toBe(HttpStatus.TOO_MANY_REQUESTS);
        expect(error.getResponse()).toEqual(new ThrottlerTooManyRequestsException().getResponse());
      }
    });
  });
});
