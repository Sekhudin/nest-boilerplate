import { ValidationException } from "src/shared/exceptions/validation/validation.exception";
import { AuthProvider } from "src/modules/auth-provider/entities/auth-provider.entity";
import { User } from "src/modules/user/entities/user.entity";
import { CreateAuthenticationTokenDto } from "./create-authentication-token.dto";

describe("CreateAuthenticationTokenDto", () => {
  let userMock: Partial<User>;
  let providerMock: Partial<AuthProvider>;
  const validate = CreateAuthenticationTokenDto.schema.validate;

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
      id: "0b1c2d3e-4f56-4789-a0b1-c2d3e4f56789",
      name: "LOCAL",
      description: "provider mock",
    };
  });

  it("should pass with a valid input", () => {
    const result = validate({
      user: userMock,
      provider: providerMock,
    });

    expect(result).toEqual({
      user: userMock,
      provider: providerMock,
    });
  });

  it("should throw if user is invalid", () => {
    try {
      validate({
        user: {},
        provider: providerMock,
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
    }
  });

  it("should throw if password is weak", () => {
    try {
      validate({
        user: userMock,
        provider: {},
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
    }
  });
});
