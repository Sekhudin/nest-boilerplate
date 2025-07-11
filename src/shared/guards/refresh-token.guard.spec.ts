import { UnauthorizedException } from "@nestjs/common";
import { RefreshTokenGuard } from "./refresh-token.guard";

describe("RefreshTokenGuard", () => {
  let guard: RefreshTokenGuard;

  beforeEach(() => {
    guard = new RefreshTokenGuard();
  });

  it("should return user if no error and user exists", () => {
    const user = { id: 1, username: "test" };
    const result = guard.handleRequest(null, user);
    expect(result).toBe(user);
  });

  it("should throw the provided error", () => {
    const error = new Error("refresh error");
    expect(() => guard.handleRequest(error, null)).toThrow("refresh error");
  });

  it("should throw UnauthorizedException if user is missing", () => {
    expect(() => guard.handleRequest(null, null)).toThrow(UnauthorizedException);
    try {
      guard.handleRequest(null, null);
    } catch (e: any) {
      expect(e.message).toBe("invalid token");
    }
  });
});
