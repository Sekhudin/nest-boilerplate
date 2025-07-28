import { HttpStatus } from "@nestjs/common";
import { ErrorCode } from "src/shared/enums/error-code.enum";
import { UserAlreadyExistsException } from "./user-already-exists.exception";
import { UserAuthenticationFailedException } from "./user-authentication-failed.exception";
import { UserEmailAlreadyUsedException } from "./user-email-already-used.exception";
import { UserEmailNotVerifiedException } from "./user-email-not-verified.exception";
import { UserInactiveException } from "./user-inactive.exception";
import { UserNotFoundException } from "./user-not-found.exception";

describe("User Exceptions", () => {
  it("UserNotFoundException", () => {
    const exception = new UserNotFoundException();

    expect(exception.getStatus()).toBe(HttpStatus.NOT_FOUND);
    expect(exception.getResponse()).toEqual({
      statusCode: HttpStatus.NOT_FOUND,
      message: ErrorCode.USER_NOT_FOUND,
      errors: {
        user: [ErrorCode.USER_NOT_FOUND],
      },
    });
  });

  it("UserAlreadyExistsException", () => {
    const exception = new UserAlreadyExistsException();

    expect(exception.getStatus()).toBe(HttpStatus.CONFLICT);
    expect(exception.getResponse()).toEqual({
      statusCode: HttpStatus.CONFLICT,
      message: ErrorCode.USER_ALREADY_EXISTS,
      errors: {
        user: [ErrorCode.USER_ALREADY_EXISTS],
      },
    });
  });

  it("UserAuthenticationFailedException", () => {
    const exception = new UserAuthenticationFailedException();

    expect(exception.getStatus()).toBe(HttpStatus.UNAUTHORIZED);
    expect(exception.getResponse()).toEqual({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: ErrorCode.USER_INVALID_CREDENTIAL,
      errors: {
        user: [ErrorCode.USER_INVALID_CREDENTIAL],
      },
    });
  });

  it("UserEmailAlreadyUsedException", () => {
    const exception = new UserEmailAlreadyUsedException();

    expect(exception.getStatus()).toBe(HttpStatus.CONFLICT);
    expect(exception.getResponse()).toEqual({
      statusCode: HttpStatus.CONFLICT,
      message: ErrorCode.USER_EMAIL_ALREADY_USED,
      errors: {
        email: [ErrorCode.USER_EMAIL_ALREADY_USED],
      },
    });
  });

  it("UserEmailNotVerifiedException", () => {
    const exception = new UserEmailNotVerifiedException();

    expect(exception.getStatus()).toBe(HttpStatus.FORBIDDEN);
    expect(exception.getResponse()).toEqual({
      statusCode: HttpStatus.FORBIDDEN,
      message: ErrorCode.USER_EMAIL_NOT_VERIFIED,
      errors: {
        email: [ErrorCode.USER_EMAIL_NOT_VERIFIED],
      },
    });
  });

  it("UserInactiveException", () => {
    const exception = new UserInactiveException();

    expect(exception.getStatus()).toBe(HttpStatus.FORBIDDEN);
    expect(exception.getResponse()).toEqual({
      statusCode: HttpStatus.FORBIDDEN,
      message: ErrorCode.USER_INACTIVE,
      errors: {
        user: [ErrorCode.USER_INACTIVE],
      },
    });
  });
});
