import { HttpStatus } from "@nestjs/common";
import { ErrorCode } from "src/shared/enums/error-code.enum";
import { UserAlreadyExistsException } from "./user-already-exists.exception";
import { UserEmailAlreadyUsedException } from "./user-email-already-used.exception";
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
