import { UnauthorizedException } from "@nestjs/common";
import { ROUTE_ARGS_METADATA } from "@nestjs/common/constants";
import { User } from "./user.decorator";

describe("User Decorator", () => {
  function getFactory(decorator: Function) {
    class TestClass {
      method(@decorator() _value: unknown) {}
    }

    const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, TestClass, "method");
    const key = Object.keys(args)[0];
    return args[key].factory;
  }

  it("should return user from request", () => {
    const mockUser = {
      sub: "123",
      username: "test",
      email: "test@example.com",
      roles: ["admin"],
      provider: "local",
      deviceId: "device-abc",
      iat: 123456,
      exp: 123789,
      iss: "issuer",
      aud: ["audience"],
    };

    const mockRequest = { user: mockUser };
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    };

    const factory = getFactory(User);
    const result = factory(null, mockContext);
    expect(result).toEqual(mockUser);
  });

  it("should throw UnauthorizedException if user not found", () => {
    const mockRequest = {};
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    };

    const factory = getFactory(User);
    expect(() => factory(null, mockContext)).toThrow(UnauthorizedException);
  });
});
