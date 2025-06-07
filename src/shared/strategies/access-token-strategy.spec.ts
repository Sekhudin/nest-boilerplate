import { UnauthorizedException } from "@nestjs/common";
import { jwtClaimsDto } from "src/shared/dto/jwt.dto";
import * as validationUtil from "src/utils/validation";
import { AccessTokenStrategy } from "./access-token.strategy";

describe("AccessTokenStrategy", () => {
  let strategy: AccessTokenStrategy;

  beforeEach(() => {
    strategy = new AccessTokenStrategy();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const validPayload = {
    sub: "user-123",
    username: "john_doe",
    email: "john@example.com",
    roles: ["user"],
    provider: "google",
    deviceId: "device-xyz",
    iat: 1717734550,
    exp: 1717738150,
    iss: "my-app",
    aud: ["my-app-client"],
  };

  it("should return validated payload if valid", async () => {
    jest.spyOn(validationUtil, "validate").mockReturnValue(validPayload as any);
    const result = await strategy.validate(validPayload);
    expect(result).toEqual(validPayload);
    expect(validationUtil.validate).toHaveBeenCalledWith(jwtClaimsDto, validPayload);
  });

  it("should throw UnauthorizedException if payload is invalid", async () => {
    const invalidPayload = { foo: "bar" };

    jest.spyOn(validationUtil, "validate").mockImplementation(() => {
      throw new UnauthorizedException("jwt claims invalid");
    });

    await expect(strategy.validate(invalidPayload)).rejects.toThrow(UnauthorizedException);
    await expect(strategy.validate(invalidPayload)).rejects.toThrow("jwt claims invalid");
  });
});
