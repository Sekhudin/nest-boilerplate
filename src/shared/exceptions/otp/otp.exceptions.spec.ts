import { ERROR_MESSAGES } from "src/shared/constants/error-messages.constant";
import { ErrorCode } from "src/shared/enums/error-code.enum";
import { OtpEmailNotVerifiedException } from "./otp-email-not-verified.exception";
import { OtpExpiredException } from "./otp-expired.exception";
import { OtpInvalidException } from "./otp-invalid.exception";
import { OtpMagicLinkExpiredException } from "./otp-magic-link-expired.exception";
import { OtpMagicLinkInvalidException } from "./otp-magic-link-invalid.exception";

describe("OTP Exceptions", () => {
  it("OtpInvalidException should return correct response", () => {
    const exception = new OtpInvalidException();
    expect(exception.getStatus()).toBe(400);
    expect(exception.getResponse()).toEqual({
      statusCode: 400,
      message: ERROR_MESSAGES[ErrorCode.OTP_INVALID],
      errors: {
        otp: [ErrorCode.OTP_INVALID],
      },
    });
  });

  it("OtpExpiredException should return correct response", () => {
    const exception = new OtpExpiredException();
    expect(exception.getStatus()).toBe(400);
    expect(exception.getResponse()).toEqual({
      statusCode: 400,
      message: ERROR_MESSAGES[ErrorCode.OTP_EXPIRED],
      errors: {
        otp: [ErrorCode.OTP_EXPIRED],
      },
    });
  });

  it("OtpEmailNotVerifiedException should return correct response", () => {
    const exception = new OtpEmailNotVerifiedException();
    expect(exception.getStatus()).toBe(400);
    expect(exception.getResponse()).toEqual({
      statusCode: 400,
      message: ERROR_MESSAGES[ErrorCode.OTP_EMAIL_NOT_VERIFIED],
      errors: {
        otp: [ErrorCode.OTP_EMAIL_NOT_VERIFIED],
      },
    });
  });

  it("OtpMagicLinkInvalidException should return correct response", () => {
    const exception = new OtpMagicLinkInvalidException();
    expect(exception.getStatus()).toBe(400);
    expect(exception.getResponse()).toEqual({
      statusCode: 400,
      message: ERROR_MESSAGES[ErrorCode.OTP_MAGIC_LINK_INVALID],
      errors: {
        magicLink: [ErrorCode.OTP_MAGIC_LINK_INVALID],
      },
    });
  });

  it("OtpMagicLinkExpiredException should return correct response", () => {
    const exception = new OtpMagicLinkExpiredException();
    expect(exception.getStatus()).toBe(400);
    expect(exception.getResponse()).toEqual({
      statusCode: 400,
      message: ERROR_MESSAGES[ErrorCode.OTP_MAGIC_LINK_EXPIRED],
      errors: {
        magicLink: [ErrorCode.OTP_MAGIC_LINK_EXPIRED],
      },
    });
  });
});
