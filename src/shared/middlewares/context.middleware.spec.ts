import { AsyncStorageService } from "src/shared/modules/global/context/async-storage.service";
import { CookieService } from "src/shared/modules/global/context/cookie.service";
import { cookieConfig } from "src/config/cookie.config";
import { ContextMiddleware } from "./context.middleware";

jest.mock("src/utils/ua", () => ({
  UserAgent: {
    parse: jest.fn().mockReturnValue({ device: "mock-device" }),
  },
}));

describe("ContextMiddleware", () => {
  let middleware: ContextMiddleware;
  let mockAsyncStorageService: Partial<AsyncStorageService>;
  let mockCookieService: Partial<CookieService>;
  let mockReq: any;
  let mockRes: any;
  let next: jest.Mock;

  beforeEach(() => {
    mockAsyncStorageService = {
      run: jest.fn((store, callback) => callback()),
    };

    mockCookieService = {
      getDeviceId: jest.fn().mockReturnValue("dev-123"),
      setDeviceId: jest.fn(),
    };

    middleware = new ContextMiddleware(
      mockAsyncStorageService as AsyncStorageService,
      mockCookieService as CookieService,
    );

    mockReq = {
      cookies: { [cookieConfig.name.deviceId]: "dev-123" },
    };
    mockRes = {};
    next = jest.fn();
  });

  it("should set requestId, deviceId, userAgent and call services", () => {
    middleware.use(mockReq, mockRes, next);

    expect(mockReq.requestId).toBeDefined();
    expect(mockReq.deviceId).toBe("dev-123");
    expect(mockReq.userAgent).toEqual({ device: "mock-device" });

    expect(mockCookieService.getDeviceId).toHaveBeenCalled();
    expect(mockCookieService.setDeviceId).toHaveBeenCalled();

    expect(mockAsyncStorageService.run).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalled();
  });

  it("should fallback deviceId to null if cookie service returns falsy", () => {
    (mockCookieService.getDeviceId as jest.Mock).mockReturnValue(null);

    middleware.use(mockReq, mockRes, next);

    expect(mockReq.deviceId).toBeNull();
    expect(mockCookieService.setDeviceId).toHaveBeenCalled();
  });
});
