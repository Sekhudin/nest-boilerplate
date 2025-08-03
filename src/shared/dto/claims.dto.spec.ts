import { ErrorCode } from "src/shared/enums/error-code.enum";
import { TokenInvalidException } from "src/shared/exceptions/auth/token-invalid.exception";
import { Claims } from "./claims.dto";

describe("Claims", () => {
  const validate = Claims.schema.validate;

  const baseClaims = {
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
    iss: "auth-server",
    aud: ["my-app"],
  };

  const validPayload = {
    sub: "user-id-123",
    roles: ["USER"],
    provider: "LOCAL",
    deviceId: "device-xyz",
  };

  const validClaims = {
    ...baseClaims,
    ...validPayload,
  };

  it("should pass with valid claims", () => {
    const result = validate(validClaims);
    expect(result).toEqual(validClaims);
  });

  it("should throw TokenInvalidException if iat is missing", () => {
    const { iat, ...claims } = validClaims;
    try {
      validate(claims);
    } catch (err: any) {
      expect(err).toBeInstanceOf(TokenInvalidException);
      expect(err.message).toMatch(ErrorCode.AUTH_TOKEN_INVALID);
    }
  });

  it("should throw TokenInvalidException if aud is not array", () => {
    try {
      validate({
        ...validClaims,
        aud: "not-an-array",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(TokenInvalidException);
      expect(err.message).toMatch(ErrorCode.AUTH_TOKEN_INVALID);
    }
  });

  it("should throw TokenInvalidException if roles is not array", () => {
    try {
      validate({
        ...validClaims,
        roles: "ADMIN",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(TokenInvalidException);
      expect(err.message).toMatch(ErrorCode.AUTH_TOKEN_INVALID);
    }
  });

  it("should throw TokenInvalidException if exp is not a number", () => {
    try {
      validate({
        ...validClaims,
        exp: "not-a-number",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(TokenInvalidException);
      expect(err.message).toMatch(ErrorCode.AUTH_TOKEN_INVALID);
    }
  });

  it("should throw TokenInvalidException if deviceId is missing", () => {
    const { deviceId, ...claims } = validClaims;
    try {
      validate(claims);
    } catch (err: any) {
      expect(err).toBeInstanceOf(TokenInvalidException);
      expect(err.message).toMatch(ErrorCode.AUTH_TOKEN_INVALID);
    }
  });
});
