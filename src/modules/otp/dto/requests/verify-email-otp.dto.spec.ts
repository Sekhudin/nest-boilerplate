import { ValidationException } from "src/shared/exceptions/validation/validation.exception";
import { VerifyEmailOtpDto } from "./verify-email-otp.dto";

describe("VerifyOtpDto", () => {
  const validate = VerifyEmailOtpDto.schema.validate;

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

  it("should throw if purpose invalid", () => {
    expect(() =>
      validate({
        token: "b13ee4f1-f8d1-401d-9c76-123456abcdef",
        purpose: "INVALID",
        otpCode: "123456",
      }),
    ).toThrow(ValidationException);
  });
});
