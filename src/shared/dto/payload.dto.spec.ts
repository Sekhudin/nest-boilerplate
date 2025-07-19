import { ErrorCode } from "src/shared/enums/error-code.enum";
import { SystemInternalErrorException } from "src/shared/exceptions/system/system-internal-error.exception";
import { Payload } from "./payload.dto";

describe("Payload", () => {
  const validate = Payload.schema.validate;

  const validPayload = {
    sub: "user-id-123",
    username: "johndoe",
    email: "john@example.com",
    roles: ["USER", "ADMIN"],
    provider: "LOCAL",
    deviceId: "device-xyz",
  };

  it("should pass with valid payload", () => {
    const result = validate(validPayload);
    expect(result).toEqual(validPayload);
  });

  it("should throw SystemInternalErrorException if email is invalid", () => {
    try {
      validate({
        ...validPayload,
        email: "invalid-email",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(SystemInternalErrorException);
      expect(err.message).toMatch(ErrorCode.SYSTEM_INTERNAL_ERROR);
    }
  });

  it("should throw SystemInternalErrorException if roles is not array", () => {
    try {
      validate({
        ...validPayload,
        roles: "USER",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(SystemInternalErrorException);
      expect(err.message).toMatch(ErrorCode.SYSTEM_INTERNAL_ERROR);
    }
  });

  it("should throw SystemInternalErrorException if provider is missing", () => {
    const { provider, ...payload } = validPayload;
    try {
      validate(payload);
    } catch (err: any) {
      expect(err).toBeInstanceOf(SystemInternalErrorException);
      expect(err.message).toMatch(ErrorCode.SYSTEM_INTERNAL_ERROR);
    }
  });

  it("should throw SystemInternalErrorException if deviceId is not string", () => {
    try {
      validate({
        ...validPayload,
        deviceId: 1234,
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(SystemInternalErrorException);
      expect(err.message).toMatch(ErrorCode.SYSTEM_INTERNAL_ERROR);
    }
  });

  it("should throw SystemInternalErrorException if sub is empty", () => {
    try {
      validate({
        ...validPayload,
        sub: "",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(SystemInternalErrorException);
      expect(err.message).toMatch(ErrorCode.SYSTEM_INTERNAL_ERROR);
    }
  });
});
