import { ValidationException } from "src/shared/exceptions/validation/validation.exception";
import { Role } from "src/modules/role/entities/role.entity";
import { CreateLocalUserDto } from "./create-local-user.dto";

describe("SignUpLocalDto", () => {
  let roleMock: Partial<Role>;
  const validate = CreateLocalUserDto.schema.validate;

  beforeEach(() => {
    roleMock = {
      id: "4a1e3f6b-8e52-4f8d-9a32-3e4b5a1c2d90",
      name: "USER",
      description: "role mock",
      timestamp: new Date(),
    };
  });

  it("should pass with a valid value", () => {
    const result = validate({
      email: "user@example.com",
      role: roleMock,
    });

    expect(result).toEqual({
      email: "user@example.com",
      role: roleMock,
    });
  });

  it("should throw ValidationException if email is invalid", () => {
    try {
      validate({
        email: "invalid-email",
        role: roleMock,
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
    }
  });

  it("should throw ValidationException if role is invalid", () => {
    try {
      validate({
        email: "user@example.com",
        role: {},
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
    }
  });
});
