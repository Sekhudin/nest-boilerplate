import { AuthClaimsInvalidException } from "src/shared/exceptions/auth/auth-claims-invalid.exception";
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
    username: "johndoe",
    email: "john@example.com",
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

  it("should throw AuthClaimsInvalidException if iat is missing", () => {
    const { iat, ...claims } = validClaims;
    try {
      validate(claims);
    } catch (err: any) {
      expect(err).toBeInstanceOf(AuthClaimsInvalidException);
      expect(err.message).toMatch(/Invalid token claims/i);
    }
  });

  it("should throw AuthClaimsInvalidException if aud is not array", () => {
    try {
      validate({
        ...validClaims,
        aud: "not-an-array",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(AuthClaimsInvalidException);
      expect(err.message).toMatch(/Invalid token claims/i);
    }
  });

  it("should throw AuthClaimsInvalidException if email is invalid", () => {
    try {
      validate({
        ...validClaims,
        email: "invalid-email",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(AuthClaimsInvalidException);
      expect(err.message).toMatch(/Invalid token claims/i);
    }
  });

  it("should throw AuthClaimsInvalidException if roles is not array", () => {
    try {
      validate({
        ...validClaims,
        roles: "ADMIN", // should be array
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(AuthClaimsInvalidException);
      expect(err.message).toMatch(/Invalid token claims/i);
    }
  });

  it("should throw AuthClaimsInvalidException if exp is not a number", () => {
    try {
      validate({
        ...validClaims,
        exp: "not-a-number",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(AuthClaimsInvalidException);
      expect(err.message).toMatch(/Invalid token claims/i);
    }
  });

  it("should throw AuthClaimsInvalidException if deviceId is missing", () => {
    const { deviceId, ...claims } = validClaims;
    try {
      validate(claims);
    } catch (err: any) {
      expect(err).toBeInstanceOf(AuthClaimsInvalidException);
      expect(err.message).toMatch(/Invalid token claims/i);
    }
  });
});
