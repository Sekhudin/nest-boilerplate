import { Test, TestingModule } from "@nestjs/testing";
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
  let mockAsyncStorage: AsyncStorageService;
  let mockCookie: CookieService;
  let mockReq: any;
  let mockRes: any;
  let next: jest.Mock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContextMiddleware,
        {
          provide: AsyncStorageService,
          useValue: {
            run: jest.fn((store, callback) => callback()),
          },
        },
        {
          provide: CookieService,
          useValue: {
            getDeviceId: jest.fn().mockReturnValue("dev-123"),
            setDeviceId: jest.fn(),
          },
        },
      ],
    }).compile();

    middleware = module.get(ContextMiddleware);
    mockAsyncStorage = module.get(AsyncStorageService);
    mockCookie = module.get(CookieService);

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
    jest.spyOn(mockCookie, "getDeviceId").mockReturnValue("");

    middleware.use(mockReq, mockRes, next);

    expect(mockReq.deviceId).toBeNull();
    expect(mockCookie.setDeviceId).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
