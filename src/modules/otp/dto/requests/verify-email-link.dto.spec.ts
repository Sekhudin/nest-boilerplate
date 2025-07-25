import { ValidationException } from "src/shared/exceptions/validation/validation.exception";
import { VerifyEmailLinkDto } from "./verify-email-link.dto";

describe("VerifyLinkDto", () => {
  const validate = VerifyEmailLinkDto.schema.validate;

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

  it("should throw if purpose is invalid", () => {
    expect(() =>
      validate({
        token: "9f74bb4c-5ef4-4f85-b22d-123456abcdef",
        purpose: "INVALID",
      }),
    ).toThrow(ValidationException);
  });
});
