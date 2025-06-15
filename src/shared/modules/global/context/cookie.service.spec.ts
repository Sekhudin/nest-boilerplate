import { Request, Response } from "express";
import { jwtRefreshConfig } from "src/config/jwt-refresh.config";
import { AsyncStorageService } from "./async-storage.service";
import { CookieService } from "./cookie.service";

describe("CookieService", () => {
  let service: CookieService;
  let mockAsyncStorageService: Partial<AsyncStorageService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

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

    mockAsyncStorageService = {
      getRequest: () => mockRequest as Request,
      getResponse: () => mockResponse as Response,
    };

    service = new CookieService(mockAsyncStorageService as AsyncStorageService);
  });

  it("should get refresh token from cookies", () => {
    expect(service.getRefreshToken()).toBe("sample-token");
  });

  it("should set refresh token cookie", () => {
    service.setRefreshToken("new-token");
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
});
