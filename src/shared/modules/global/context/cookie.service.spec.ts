import { Request, Response } from "express";
import { Test, TestingModule } from "@nestjs/testing";
import { cookieConfig } from "src/config/cookie.config";
import { jwtRefreshConfig } from "src/config/jwt-refresh.config";
import { AsyncStorageService } from "./async-storage.service";
import { CookieService } from "./cookie.service";

jest.mock("crypto", () => ({
  randomUUID: () => "mock-device-id",
}));

describe("CookieService", () => {
  let service: CookieService;
  let mockAsyncStorageService: Partial<AsyncStorageService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(async () => {
    mockRequest = {
      cookies: {
        [jwtRefreshConfig.cookieName]: "sample-token",
      },
    };

    mockResponse = {
      cookie: jest.fn(),
      clearCookie: jest.fn(),
    };

    mockAsyncStorageService = {
      getRequest: () => mockRequest as Request,
      getResponse: () => mockResponse as Response,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CookieService,
        {
          provide: AsyncStorageService,
          useValue: mockAsyncStorageService,
        },
      ],
    }).compile();

    service = module.get<CookieService>(CookieService);
  });

  it("should get refresh token from cookies", () => {
    expect(service.getRefreshToken()).toBe("sample-token");
  });

  it("should set refresh token cookie and device id if not exist", () => {
    delete mockRequest.cookies?.[cookieConfig.name.deviceId];

    service.setRefreshToken("new-token");

    expect(mockResponse.cookie).toHaveBeenCalledWith(
      cookieConfig.name.deviceId,
      "mock-device-id",
      expect.objectContaining({
        httpOnly: expect.any(Boolean),
        secure: expect.any(Boolean),
        sameSite: expect.any(String),
        maxAge: undefined,
      }),
    );

    expect(mockResponse.cookie).toHaveBeenCalledWith(
      jwtRefreshConfig.cookieName,
      "new-token",
      jwtRefreshConfig.cookieOptions,
    );
  });

  it("should not set device id again if already exists", () => {
    mockRequest.cookies![cookieConfig.name.deviceId] = "existing-id";
    service.setDeviceId();

    expect(mockResponse.cookie).not.toHaveBeenCalledWith(
      cookieConfig.name.deviceId,
      expect.anything(),
      expect.anything(),
    );
  });

  it("should clear refresh token cookie", () => {
    service.clearRefreshToken();
    expect(mockResponse.clearCookie).toHaveBeenCalledWith(jwtRefreshConfig.cookieName, undefined);
  });

  it("should clear device id cookie", () => {
    service.clearDeviceId();
    expect(mockResponse.clearCookie).toHaveBeenCalledWith(cookieConfig.name.deviceId, undefined);
  });
});
