import { ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
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
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(HttpStatus.TOO_MANY_REQUESTS);
        expect(error.getResponse()).toEqual({
          message: "Too Many Requests",
          error: "Too Many Requests",
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
        });
      }
    });
  });
});
