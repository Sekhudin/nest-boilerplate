import { ValidationException } from "src/shared/exceptions/validation/validation.exception";
import { User } from "src/modules/user/entities/user.entity";
import { FindValidLocalUserAuthDto } from "./find-valid-local-user-auth.dto";

describe("FindValidLocalCredentialDto", () => {
  let userMock: Partial<User>;
  const validate = FindValidLocalUserAuthDto.schema.validate;

  beforeEach(() => {
    userMock = {
      id: "0b1c2d3e-4f56-4789-a0b1-c2d3e4f56789",
      email: "example@mail.com",
      isActive: false,
      isEmailVerified: false,
      updatedAt: new Date(),
      timestamp: new Date(),
    };
  });

  it("should pass with a valid input", () => {
    const result = validate({
      user: userMock,
      password: "StrongP@ss1",
    });

    expect(result).toEqual({
      user: userMock,
      password: "StrongP@ss1",
    });
  });

  it("should throw if user is invalid", () => {
    try {
      validate({
        user: {},
        password: "StrongP@ss1",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
    }
  });

  it("should throw if password is weak", () => {
    try {
      validate({
        user: userMock,
        password: "weak-password",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
    }
  });
});
