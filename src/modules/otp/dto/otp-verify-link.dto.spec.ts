import { BadRequestException } from "@nestjs/common";
import { OtpVerifyLinkDto } from "./otp-verify-link.dto";

describe("OtpVerifyLinkDto", () => {
  const validate = OtpVerifyLinkDto.schema.validate;

  it("should pass with valid input (EMAIL_VERIFICATION)", () => {
    const result = validate({
      token: "9f74bb4c-5ef4-4f85-b22d-123456abcdef",
      purpose: "EMAIL_VERIFICATION",
    });

    expect(result).toEqual({
      token: "9f74bb4c-5ef4-4f85-b22d-123456abcdef",
      purpose: "EMAIL_VERIFICATION",
    });
  });

  it("should pass with valid input (PASSWORD_RESET)", () => {
    const result = validate({
      token: "9f74bb4c-5ef4-4f85-b22d-123456abcdef",
      purpose: "PASSWORD_RESET",
    });

    expect(result).toEqual({
      token: "9f74bb4c-5ef4-4f85-b22d-123456abcdef",
      purpose: "PASSWORD_RESET",
    });
  });

  it("should pass with valid input (SIGNIN)", () => {
    const result = validate({
      token: "9f74bb4c-5ef4-4f85-b22d-123456abcdef",
      purpose: "SIGNIN",
    });

    expect(result).toEqual({
      token: "9f74bb4c-5ef4-4f85-b22d-123456abcdef",
      purpose: "SIGNIN",
    });
  });

  it("should throw if token is missing", () => {
    expect(() =>
      validate({
        purpose: "EMAIL_VERIFICATION",
      }),
    ).toThrow(BadRequestException);
  });

  it("should throw if token is empty", () => {
    expect(() =>
      validate({
        token: "",
        purpose: "EMAIL_VERIFICATION",
      }),
    ).toThrow(BadRequestException);
  });

  it("should throw if purpose is missing", () => {
    expect(() =>
      validate({
        token: "9f74bb4c-5ef4-4f85-b22d-123456abcdef",
      }),
    ).toThrow(BadRequestException);
  });

  it("should throw if purpose is invalid", () => {
    expect(() =>
      validate({
        token: "9f74bb4c-5ef4-4f85-b22d-123456abcdef",
        purpose: "INVALID" as any,
      }),
    ).toThrow(BadRequestException);
  });
});
