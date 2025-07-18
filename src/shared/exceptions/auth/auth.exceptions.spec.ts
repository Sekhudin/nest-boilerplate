import { ERROR_MESSAGES } from "src/shared/constants/error-messages.constant";
import { ErrorCode } from "src/shared/enums/error-code.enum";
import { AccountLockedException } from "./account-locked.exception";
import { ForbiddenException } from "./forbidden.exception";
import { InvalidCredentialsException } from "./invalid-credentials.exception";
import { TokenExpiredException } from "./token-expired.exception";
import { TokenInvalidException } from "./token-invalid.exception";
import { UnauthorizedException } from "./unauthorized.exception";

describe("Auth Exceptions", () => {
  it("InvalidCredentialsException should be constructed correctly", () => {
    const exception = new InvalidCredentialsException();
    const response = exception.getResponse() as any;
    expect(exception.getStatus()).toBe(401);
    expect(response.message).toBe(ERROR_MESSAGES[ErrorCode.AUTH_INVALID_CREDENTIALS]);
    expect(response.errors).toEqual({ auth: [ErrorCode.AUTH_UNAUTHORIZED, ErrorCode.AUTH_INVALID_CREDENTIALS] });
  });

  it("UnauthorizedException should be constructed correctly", () => {
    const exception = new UnauthorizedException();
    const response = exception.getResponse() as any;
    expect(exception.getStatus()).toBe(401);
    expect(response.message).toBe(ERROR_MESSAGES[ErrorCode.AUTH_UNAUTHORIZED]);
    expect(response.errors).toEqual({ auth: [ErrorCode.AUTH_UNAUTHORIZED] });
  });

  it("ForbiddenException should be constructed correctly", () => {
    const exception = new ForbiddenException();
    const response = exception.getResponse() as any;
    expect(exception.getStatus()).toBe(403);
    expect(response.message).toBe(ERROR_MESSAGES[ErrorCode.AUTH_FORBIDDEN]);
    expect(response.errors).toEqual({ auth: [ErrorCode.AUTH_FORBIDDEN] });
  });

  it("TokenExpiredException should be constructed correctly", () => {
    const exception = new TokenExpiredException();
    const response = exception.getResponse() as any;
    expect(exception.getStatus()).toBe(401);
    expect(response.message).toBe(ERROR_MESSAGES[ErrorCode.AUTH_TOKEN_EXPIRED]);
    expect(response.errors).toEqual({ token: [ErrorCode.AUTH_UNAUTHORIZED, ErrorCode.AUTH_TOKEN_EXPIRED] });
  });

  it("TokenInvalidException should be constructed correctly", () => {
    const exception = new TokenInvalidException();
    const response = exception.getResponse() as any;
    expect(exception.getStatus()).toBe(401);
    expect(response.message).toBe(ERROR_MESSAGES[ErrorCode.AUTH_TOKEN_INVALID]);
    expect(response.errors).toEqual({ token: [ErrorCode.AUTH_UNAUTHORIZED, ErrorCode.AUTH_TOKEN_INVALID] });
  });

  it("AccountLockedException should be constructed correctly", () => {
    const exception = new AccountLockedException();
    const response = exception.getResponse() as any;
    expect(exception.getStatus()).toBe(403);
    expect(response.message).toBe(ERROR_MESSAGES[ErrorCode.AUTH_ACCOUNT_LOCKED]);
    expect(response.errors).toEqual({ auth: [ErrorCode.AUTH_FORBIDDEN, ErrorCode.AUTH_ACCOUNT_LOCKED] });
  });
});
