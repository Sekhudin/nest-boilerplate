import { Request, Response } from "express";
import { jwtRefreshConfig } from "src/config/jwt-refresh.config";
import { RequestWithRes } from "src/types/global";
import { CookieService } from "./cookie.service";

describe("CookieService", () => {
  let service: CookieService;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockResponse = {
      cookie: jest.fn(),
      clearCookie: jest.fn(),
    };

    mockRequest = {
      cookies: {
        [jwtRefreshConfig.cookieName]: "sample-token",
      },
      res: mockResponse as Response,
    };

    service = new CookieService(mockRequest as RequestWithRes);
  });

  it("should get cookie value", () => {
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
