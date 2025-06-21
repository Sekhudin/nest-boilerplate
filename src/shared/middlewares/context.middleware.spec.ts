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
  let mockAsyncStorage: Partial<AsyncStorageService>;
  let mockCookie: Partial<CookieService>;
  let mockReq: any;
  let mockRes: any;
  let next: jest.Mock;

  beforeEach(() => {
    mockAsyncStorage = {
      run: jest.fn((store, callback) => callback()),
    };

    mockCookie = {
      getDeviceId: jest.fn().mockReturnValue("dev-123"),
      setDeviceId: jest.fn(),
    };

    middleware = new ContextMiddleware(
      mockAsyncStorage as AsyncStorageService,
      mockCookie as CookieService,
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

    expect(mockCookie.getDeviceId).toHaveBeenCalled();
    expect(mockCookie.setDeviceId).toHaveBeenCalled();

    expect(mockAsyncStorage.run).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalled();
  });

  it("should fallback deviceId to null if cookie service returns falsy", () => {
    (mockCookie.getDeviceId as jest.Mock).mockReturnValue(null);

    middleware.use(mockReq, mockRes, next);

    expect(mockReq.deviceId).toBeNull();
    expect(mockCookie.setDeviceId).toHaveBeenCalled();
  });
});
