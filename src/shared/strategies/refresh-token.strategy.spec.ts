import { UnauthorizedException } from "@nestjs/common";
import { Claims } from "src/shared/dto/claims.dto";
import { RefreshTokenStrategy } from "./refresh-token.strategy";

describe("RefreshTokenStrategy", () => {
  let strategy: RefreshTokenStrategy;

  beforeEach(() => {
    strategy = new RefreshTokenStrategy();
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
    jest.spyOn(Claims.schema, "validate").mockReturnValue(validPayload as any);

    const result = await strategy.validate(validPayload);
    expect(result).toEqual(validPayload);
    expect(Claims.schema.validate).toHaveBeenCalledWith(validPayload);
  });

  it("should throw UnauthorizedException if payload is invalid", async () => {
    const invalidPayload = { foo: "bar" };

    jest.spyOn(Claims.schema, "validate").mockImplementation(() => {
      throw new UnauthorizedException("jwt claims invalid");
    });

    await expect(strategy.validate(invalidPayload)).rejects.toThrow(UnauthorizedException);
    await expect(strategy.validate(invalidPayload)).rejects.toThrow("jwt claims invalid");
  });
});
