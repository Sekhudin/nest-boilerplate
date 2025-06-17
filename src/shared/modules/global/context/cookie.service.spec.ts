import { Request, Response } from "express";
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
  let mockStorage: Record<string, unknown>;

  beforeEach(() => {
    mockRequest = {
      cookies: {
        [jwtRefreshConfig.cookieName]: "sample-token",
      },
    };

    mockResponse = {
      cookie: jest.fn(),
      clearCookie: jest.fn(),
    };

    mockStorage = {
      req: mockRequest,
      res: mockResponse,
    };

    mockAsyncStorageService = {
      get: <T>(key: string) => mockStorage[key] as T,
      getRequest: () => mockRequest as Request,
      getResponse: () => mockResponse as Response,
    };

    service = new CookieService(mockAsyncStorageService as AsyncStorageService);
  });

  it("should get refresh token from cookies", () => {
    expect(service.getRefreshToken()).toBe("sample-token");
  });

  it("should set refresh token cookie and device id if not exist", () => {
    if (mockRequest.cookies) {
      delete mockRequest.cookies[cookieConfig.name.deviceId];
    }

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

  it("should clear refresh token cookie", () => {
    service.clearRefreshToken();
    expect(mockResponse.clearCookie).toHaveBeenCalledWith(jwtRefreshConfig.cookieName, undefined);
  });

  it("should clear device id cookie", () => {
    service.clearDeviceId();
    expect(mockResponse.clearCookie).toHaveBeenCalledWith(cookieConfig.name.deviceId, undefined);
  });
});
