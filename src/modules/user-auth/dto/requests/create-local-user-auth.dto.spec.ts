import { ValidationException } from "src/shared/exceptions/validation/validation.exception";
import { AuthProvider } from "src/modules/auth-provider/entities/auth-provider.entity";
import { User } from "src/modules/user/entities/user.entity";
import { CreateLocalUserAuthDto } from "./create-local-user-auth.dto";

describe("CreateLocalUserAuthDto", () => {
  let userMock: Partial<User>;
  let providerMock: Partial<AuthProvider>;
  const validate = CreateLocalUserAuthDto.schema.validate;

  beforeEach(() => {
    userMock = {
      id: "0b1c2d3e-4f56-4789-a0b1-c2d3e4f56789",
      email: "example@mail.com",
      isActive: false,
      isEmailVerified: false,
      updatedAt: new Date(),
      timestamp: new Date(),
    };

    providerMock = {
      id: "4a1e3f6b-8e52-4f8d-9a32-3e4b5a1c2d90",
      name: "LOCAL",
      description: "provider mock",
    };
  });

  it("should pass with a valid input", () => {
    const result = validate({
      user: userMock,
      provider: providerMock,
      password: "StrongP@ss1",
    });

    expect(result).toEqual({
      user: userMock,
      provider: providerMock,
      password: "StrongP@ss1",
    });
  });

  it("should throw if user is invalid", () => {
    try {
      validate({
        user: {},
        provider: providerMock,
        password: "StrongP@ss1",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
    }
  });

  it("should throw if provider is invalid", () => {
    try {
      validate({
        user: userMock,
        provider: {},
        password: "StrongP@ss1",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
    }
  });

  it("should throw if password is weak", () => {
    try {
      validate({
        user: userMock,
        provider: providerMock,
        password: "weak-password",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
    }
  });
});
