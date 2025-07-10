import { InternalServerErrorException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { Payload } from "src/shared/dto/payload.dto";
import { JwtTokenService } from "./jwt-token.service";

describe("JwtTokenService", () => {
  let tokenService: JwtTokenService;
  let jwtService: JwtService;

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtTokenService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    tokenService = module.get<JwtTokenService>(JwtTokenService);
    jwtService = module.get<JwtService>(JwtService);
  });

  const validPayload: Payload = {
    sub: "user-123",
    username: "testuser",
    email: "test@example.com",
    roles: ["user"],
    provider: "local",
    deviceId: "device-abc",
  };

  it("should call signAsync with validated payload for refresh token", async () => {
    mockJwtService.signAsync.mockResolvedValueOnce("refresh-token");
    const token = await tokenService.signRefreshToken(validPayload);
    expect(token).toBe("refresh-token");
    expect(mockJwtService.signAsync).toHaveBeenCalledWith(expect.objectContaining(validPayload), expect.any(Object));
  });

  it("should call signAsync with validated payload for access token", async () => {
    mockJwtService.signAsync.mockResolvedValueOnce("access-token");
    const token = await tokenService.signAccessToken(validPayload);
    expect(token).toBe("access-token");
    expect(mockJwtService.signAsync).toHaveBeenCalledWith(expect.objectContaining(validPayload), expect.any(Object));
  });

  it("should return both access and refresh tokens in signJwtToken()", async () => {
    mockJwtService.signAsync.mockResolvedValueOnce("refresh-token").mockResolvedValueOnce("access-token");

    const result = await tokenService.signToken(validPayload);

    expect(result).toEqual({
      refreshToken: "refresh-token",
      accessToken: "access-token",
    });

    expect(mockJwtService.signAsync).toHaveBeenCalledTimes(2);
  });

  it("should throw InternalServerErrorException if payload is invalid", async () => {
    const invalidPayload = {
      ...validPayload,
      email: "not-an-email",
    };

    try {
      await tokenService.signAccessToken(invalidPayload as any);
      fail("Expected InternalServerErrorException was not thrown");
    } catch (err: any) {
      expect(err).toBeInstanceOf(InternalServerErrorException);
      expect(err.message).toBe("invalid jwt payload.");
    }
  });
});
