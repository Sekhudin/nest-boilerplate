import { ValidationException } from "src/shared/exceptions/validation/validation.exception";
import { SignInLocalDto } from "./sign-in-local.dto";

describe("SignInLocalDto", () => {
  const validate = SignInLocalDto.schema.validate;

  it("should pass with a valid input", () => {
    const result = validate({
      email: "user@example.com",
      password: "StrongP@ss1",
    });

    expect(result).toEqual({
      email: "user@example.com",
      password: "StrongP@ss1",
    });
  });

  it("should throw if email is invalid", () => {
    try {
      validate({
        email: "invalid-email",
        password: "StrongP@ss1",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
    }
  });

  it("should throw if email is empty", () => {
    try {
      validate({
        email: "",
        password: "StrongP@ss1",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
    }
  });

  it("should throw if password is empty", () => {
    try {
      validate({
        email: "user@example.com",
        password: "",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
    }
  });
});
