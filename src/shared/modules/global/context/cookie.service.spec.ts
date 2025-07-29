import { Request, Response } from "express";
import { mock } from "jest-mock-extended";
import { Test, TestingModule } from "@nestjs/testing";
import { cookieConfig } from "src/config/cookie.config";
import { jwtRefreshConfig } from "src/config/jwt-refresh.config";
import { getFreshAsyncStorageServiceMock } from "test/mocks/services/async-storage.service.mock";
import { AsyncStorageService } from "./async-storage.service";
import { CookieService } from "./cookie.service";

describe("CookieService", () => {
  let service: CookieService;
  const asyncStorageServiceMock = getFreshAsyncStorageServiceMock();
  const requestMock = mock<Request>();
  const responseMock = mock<Response>();

  beforeEach(async () => {
    requestMock.cookies = {
      [jwtRefreshConfig.COOKIE_NAME]: "example-token",
      [cookieConfig.COOKIE_NAME.DEVICE_ID]: "device-012",
    };

    responseMock.cookie.mockClear();
    responseMock.clearCookie.mockClear();
    asyncStorageServiceMock.getRequest.mockReturnValue(requestMock);
    asyncStorageServiceMock.getResponse.mockReturnValue(responseMock);

    const module: TestingModule = await Test.createTestingModule({
      providers: [CookieService, { provide: AsyncStorageService, useValue: asyncStorageServiceMock }],
    }).compile();

    service = module.get<CookieService>(CookieService);
  });

  describe("get", () => {
    it("should return cookie value if exists", () => {
      expect(service.get(cookieConfig.COOKIE_NAME.DEVICE_ID)).toBe("device-012");
    });

    it("should return empty string if cookie does not exist", () => {
      expect(service.get("NON_EXISTENT_COOKIE")).toBe("");
    });
  });

  describe("set", () => {
    it("should set cookie with default options", () => {
      service.set("SOME_KEY", "some_value");
      expect(responseMock.cookie).toHaveBeenCalledWith(
        "SOME_KEY",
        "some_value",
        expect.objectContaining({
          httpOnly: expect.any(Boolean),
          secure: expect.any(Boolean),
          sameSite: expect.any(String),
        }),
      );
    });

    it("should set cookie with custom options", () => {
      service.set("CUSTOM_KEY", "custom_value", { maxAge: 9999 });
      expect(responseMock.cookie).toHaveBeenCalledWith(
        "CUSTOM_KEY",
        "custom_value",
        expect.objectContaining({ maxAge: 9999 }),
      );
    });
  });

  describe("clear", () => {
    it("should clear cookie with default options", () => {
      service.clear("CLEAR_KEY", jwtRefreshConfig.cookieOptions);
      expect(responseMock.clearCookie).toHaveBeenCalledWith("CLEAR_KEY", jwtRefreshConfig.cookieOptions);
    });

    it("should clear cookie with undefined options", () => {
      service.clear("CLEAR_KEY");
      expect(responseMock.clearCookie).toHaveBeenCalledWith("CLEAR_KEY", undefined);
    });
  });

  describe("deviceId utilities", () => {
    it("should return device ID", () => {
      expect(service.getDeviceId()).toBe("device-012");
    });

    it("should call set with correct key and no maxAge", () => {
      service.setDeviceId("abc123");
      expect(responseMock.cookie).toHaveBeenCalledWith(
        cookieConfig.COOKIE_NAME.DEVICE_ID,
        "abc123",
        expect.objectContaining({ maxAge: undefined }),
      );
    });

    it("should clear device ID", () => {
      service.clearDeviceId();
      expect(responseMock.clearCookie).toHaveBeenCalledWith(cookieConfig.COOKIE_NAME.DEVICE_ID, undefined);
    });

    it("should return true if device ID exists", () => {
      expect(service.hasDeviceId()).toBe(true);
    });

    it("should return false if device ID is empty", () => {
      requestMock.cookies[cookieConfig.COOKIE_NAME.DEVICE_ID] = "";
      expect(service.hasDeviceId()).toBe(false);
    });
  });

  describe("refresh token utilities", () => {
    it("should return refresh token", () => {
      expect(service.getRefreshToken()).toBe("example-token");
    });

    it("should call set with correct config", () => {
      service.setRefreshToken("refresh-xyz");
      expect(responseMock.cookie).toHaveBeenCalledWith(
        jwtRefreshConfig.COOKIE_NAME,
        "refresh-xyz",
        jwtRefreshConfig.cookieOptions,
      );
    });

    it("should call clear with correct config", () => {
      service.clearRefreshToken();
      expect(responseMock.clearCookie).toHaveBeenCalledWith(jwtRefreshConfig.COOKIE_NAME, undefined);
    });
  });
});
