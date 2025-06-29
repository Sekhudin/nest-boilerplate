import { BadRequestException } from "@nestjs/common";
import { SignUpLocalDto } from "./sign-up-local.dto";

describe("SignUpLocalDto", () => {
  const validate = SignUpLocalDto.schema.validate;

  it("should pass with a valid password", () => {
    const result = validate({
      email: "user@example.com",
      password: "StrongP@ss1",
      confirmPassword: "StrongP@ss1",
    });

    expect(result).toEqual({
      email: "user@example.com",
      password: "StrongP@ss1",
      confirmPassword: "StrongP@ss1",
    });
  });

  it("should throw BadRequestException if passwords do not match", () => {
    try {
      validate({
        email: "user@example.com",
        password: "StrongP@ss1",
        confirmPassword: "MismatchP@ss1",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.message).toMatch(/password and confirm password not match!/);
    }
  });

  it("should throw BadRequestException if email is invalid", () => {
    try {
      validate({
        email: "invalid-email",
        password: "StrongP@ss1",
        confirmPassword: "StrongP@ss1",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.message).toMatch(/email/i);
    }
  });

  it("should throw BadRequestException if password is too weak (no uppercase)", () => {
    try {
      validate({
        email: "user@example.com",
        password: "weakpass1!",
        confirmPassword: "weakpass1!",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.message).toMatch(/Password must be at least 8 characters/);
    }
  });

  it("should throw BadRequestException if password is too short", () => {
    try {
      validate({
        email: "user@example.com",
        password: "Sh0!",
        confirmPassword: "Sh0!",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.message).toMatch(/Password must be at least 8 characters/);
    }
  });

  it("should throw BadRequestException if confirmPassword is empty", () => {
    try {
      validate({
        email: "user@example.com",
        password: "StrongP@ss1",
        confirmPassword: "",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.message).toMatch(/Too small/i);
    }
  });
});
