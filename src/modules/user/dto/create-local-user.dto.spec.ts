import { ValidationException } from "src/shared/exceptions/validation/validation.exception";
import { CreateLocalUserDto } from "./create-local-user.dto";

describe("SignUpLocalDto", () => {
  const validate = CreateLocalUserDto.schema.validate;

  it("should pass with a valid password", () => {
    const result = validate({
      email: "user@example.com",
      password: "StrongP@ss1",
    });

    expect(result).toEqual({
      email: "user@example.com",
      password: "StrongP@ss1",
    });
  });

  it("should throw ValidationException if email is invalid", () => {
    try {
      validate({
        email: "invalid-email",
        password: "StrongP@ss1",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
      expect(err.message).toMatch(/Validation failed/);
    }
  });

  it("should throw ValidationException if password is too weak (no uppercase)", () => {
    try {
      validate({
        email: "user@example.com",
        password: "weakpass1!",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
      expect(err.message).toMatch(/Validation failed/);
    }
  });

  it("should throw ValidationException if password is too short", () => {
    try {
      validate({
        email: "user@example.com",
        password: "Sh0!",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
      expect(err.message).toMatch(/Validation failed/);
    }
  });
});
