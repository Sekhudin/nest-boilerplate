import { Test, TestingModule } from "@nestjs/testing";
import type { Request, Response } from "express";
import { CookieService } from "./cookie.service";
import { jwtRefreshCookieConfig } from "src/configs/cookie.config";

describe("CookieService", () => {
  let service: CookieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CookieService],
    }).compile();

    service = module.get<CookieService>(CookieService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getCookieRefreshToken", () => {
    it("should return refresh token from cookies", () => {
      const mockRequest = { cookies: { [jwtRefreshCookieConfig.name]: "test-token" } } as Request;
      const token = service.getCookieRefreshToke(mockRequest);
      expect(token).toBe("test-token");
    });

    it("should return undefined if refresh token is not set", () => {
      const mockRequest = { cookies: {} } as Request;
      const token = service.getCookieRefreshToke(mockRequest);
      expect(token).toBeUndefined();
    });
  });

  describe("setCookieRefreshToken", () => {
    it("should set the refresh token in cookies", () => {
      const mockResponse = {
        cookie: jest.fn(),
      } as unknown as Response;

      service.setCookieRefreshToken(mockResponse, "test-token");

      expect(mockResponse.cookie).toHaveBeenCalledWith(
        jwtRefreshCookieConfig.name,
        "test-token",
        jwtRefreshCookieConfig.options,
      );
    });
  });

  describe("clearCookieRefreshToken", () => {
    it("should clear the refresh token from cookies", () => {
      const mockResponse = {
        clearCookie: jest.fn(),
      } as unknown as Response;

      service.clearCookieRefreshToken(mockResponse);

      expect(mockResponse.clearCookie).toHaveBeenCalledWith(jwtRefreshCookieConfig.name);
    });
  });
});
