import { NextFunction, Request, Response } from "express";
import { mock, mockFn } from "jest-mock-extended";
import { Test, TestingModule } from "@nestjs/testing";
import { AsyncStorageService } from "src/shared/modules/global/context/async-storage.service";
import { CookieService } from "src/shared/modules/global/context/cookie.service";
import { getFreshCookieConfigMock } from "test/mocks/config/cookie.config.mock";
import { getFreshAsyncStorageServiceMock } from "test/mocks/services/async-storage.service.mock";
import { getFreshCookieServiceMock } from "test/mocks/services/cookie.service.mock";
import { ContextMiddleware } from "./context.middleware";

jest.mock("src/utils/ua", () => ({
  UserAgent: {
    parse: jest.fn().mockReturnValue({ device: "mock-device" }),
  },
}));

let cookieConfigMock: ReturnType<typeof getFreshCookieConfigMock>;
jest.mock("src/config/cookie.config", () => ({
  get cookieConfig() {
    return cookieConfigMock;
  },
}));

describe("ContextMiddleware", () => {
  let middleware: ContextMiddleware;

  const asyncStorageServiceMock = getFreshAsyncStorageServiceMock();
  const cookieServiceMock = getFreshCookieServiceMock();
  const nextMock = mockFn<NextFunction>();

  beforeEach(async () => {
    jest.clearAllMocks();
    cookieConfigMock = getFreshCookieConfigMock();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContextMiddleware,
        { provide: AsyncStorageService, useValue: asyncStorageServiceMock },
        { provide: CookieService, useValue: cookieServiceMock },
      ],
    }).compile();

    middleware = module.get(ContextMiddleware);
  });

  it("should assign context values if deviceId exists", () => {
    const req = mock<Request>();
    const res = mock<Response>();

    req.cookies = {
      [cookieConfigMock.COOKIE_NAME.DEVICE_ID]: "dev-123",
    };

    cookieServiceMock.hasDeviceId.mockReturnValue(true);
    cookieServiceMock.getDeviceId.mockReturnValue("dev-123");

    asyncStorageServiceMock.run.mockImplementation((store, callback) => {
      callback();
    });

    middleware.use(req, res, nextMock);

    expect(req.requestId).toBeDefined();
    expect(req.deviceId).toBe("dev-123");
    expect(req.userAgent).toEqual({ device: "mock-device" });

    expect(cookieServiceMock.getDeviceId).toHaveBeenCalled();
    expect(cookieServiceMock.setDeviceId).not.toHaveBeenCalled();
    expect(asyncStorageServiceMock.run).toHaveBeenCalled();
    expect(nextMock).toHaveBeenCalled();
  });

  it("should generate and set deviceId if not exists", () => {
    const req = mock<Request>();
    const res = mock<Response>();

    req.cookies = {};

    cookieServiceMock.hasDeviceId.mockReturnValue(false);

    asyncStorageServiceMock.run.mockImplementation((store, callback) => {
      callback();
    });

    middleware.use(req, res, nextMock);

    expect(req.requestId).toBeDefined();
    expect(req.deviceId).toBeDefined();
    expect(typeof req.deviceId).toBe("string");
    expect(req.userAgent).toEqual({ device: "mock-device" });

    expect(cookieServiceMock.setDeviceId).toHaveBeenCalledWith(req.deviceId);
    expect(nextMock).toHaveBeenCalled();
  });
});
