import { ValidationException } from "src/shared/exceptions/validation/validation.exception";
import { OtpVerifyDto } from "./otp-verify.dto";

describe("OtpVerifyDto", () => {
  const validate = OtpVerifyDto.schema.validate;

  it("should pass with valid input (EMAIL_VERIFICATION)", () => {
    const result = validate({
      token: "b13ee4f1-f8d1-401d-9c76-123456abcdef",
      purpose: "EMAIL_VERIFICATION",
      otpCode: "123456",
    });

    expect(result).toEqual({
      token: "b13ee4f1-f8d1-401d-9c76-123456abcdef",
      purpose: "EMAIL_VERIFICATION",
      otpCode: "123456",
    });
  });

  it("should pass with valid input (PASSWORD_RESET)", () => {
    const result = validate({
      token: "4c74d320-d6aa-4abf-9e93-abcdef123456",
      purpose: "PASSWORD_RESET",
      otpCode: "654321",
    });

    expect(result).toEqual({
      token: "4c74d320-d6aa-4abf-9e93-abcdef123456",
      purpose: "PASSWORD_RESET",
      otpCode: "654321",
    });
  });

  it("should pass with valid input (SIGNIN)", () => {
    const result = validate({
      token: "b13ee4f1-f8d1-401d-9c76-123456abcdef",
      purpose: "SIGNIN",
      otpCode: "111111",
    });

    expect(result).toEqual({
      token: "b13ee4f1-f8d1-401d-9c76-123456abcdef",
      purpose: "SIGNIN",
      otpCode: "111111",
    });
  });

  it("should throw if token is missing", () => {
    expect(() =>
      validate({
        purpose: "EMAIL_VERIFICATION",
        otpCode: "123456",
      }),
    ).toThrow(ValidationException);
  });

  it("should throw if token is empty", () => {
    expect(() =>
      validate({
        token: "",
        purpose: "EMAIL_VERIFICATION",
        otpCode: "123456",
      }),
    ).toThrow(ValidationException);
  });

  it("should throw if purpose is missing", () => {
    expect(() =>
      validate({
        token: "b13ee4f1-f8d1-401d-9c76-123456abcdef",
        otpCode: "123456",
      }),
    ).toThrow(ValidationException);
  });

  it("should throw if purpose is invalid", () => {
    expect(() =>
      validate({
        token: "b13ee4f1-f8d1-401d-9c76-123456abcdef",
        purpose: "INVALID" as any,
        otpCode: "123456",
      }),
    ).toThrow(ValidationException);
  });

  it("should throw if otpCode is missing", () => {
    expect(() =>
      validate({
        token: "b13ee4f1-f8d1-401d-9c76-123456abcdef",
        purpose: "EMAIL_VERIFICATION",
      }),
    ).toThrow(ValidationException);
  });

  it("should throw if otpCode is empty", () => {
    expect(() =>
      validate({
        token: "b13ee4f1-f8d1-401d-9c76-123456abcdef",
        purpose: "EMAIL_VERIFICATION",
        otpCode: "",
      }),
    ).toThrow(ValidationException);
  });
});
