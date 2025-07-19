import { ValidationException } from "src/shared/exceptions/validation/validation.exception";
import { SignUpLocalDto } from "./sign-up-local.dto";

describe("SignUpLocalDto", () => {
  const validate = SignUpLocalDto.schema.validate;

  it("should pass with a valid input", () => {
    const result = validate({
      email: "user@example.com",
      password: "StrongP@ss1",
      confirmPassword: "StrongP@ss1",
    });

    expect(result).toEqual({
      email: "user@example.com",
      password: "StrongP@ss1",
    });

    expect(result).not.toHaveProperty("confirmPassword");
  });

  it("should throw if passwords do not match", () => {
    try {
      validate({
        email: "user@example.com",
        password: "StrongP@ss1",
        confirmPassword: "MismatchP@ss1",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
    }
  });

  it("should throw if email is invalid", () => {
    try {
      validate({
        email: "invalid-email",
        password: "StrongP@ss1",
        confirmPassword: "StrongP@ss1",
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
        confirmPassword: "StrongP@ss1",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
    }
  });

  it("should throw if password is too short", () => {
    try {
      validate({
        email: "user@example.com",
        password: "Sh0!",
        confirmPassword: "Sh0!",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
    }
  });

  it("should throw if password is too weak (no uppercase or symbol)", () => {
    try {
      validate({
        email: "user@example.com",
        password: "weakpass1",
        confirmPassword: "weakpass1",
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
        confirmPassword: "",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
    }
  });

  it("should throw if confirmPassword is empty", () => {
    try {
      validate({
        email: "user@example.com",
        password: "StrongP@ss1",
        confirmPassword: "",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
    }
  });
});
