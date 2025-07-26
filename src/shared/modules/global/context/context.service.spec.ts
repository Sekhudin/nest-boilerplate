import { Request } from "express";
import { Test, TestingModule } from "@nestjs/testing";
import { Claims } from "src/shared/dto/claims.dto";
import { getFreshAsyncStorageServiceMock } from "test/mocks/services/async-storage.service.mock";
import { AsyncStorageService } from "./async-storage.service";
import { ContextService } from "./context.service";

describe("ContextService", () => {
  let service: ContextService;
  const asyncStorageServiceMock = getFreshAsyncStorageServiceMock();

  const claimsMock: Claims = {
    sub: "user-id-1",
    username: "john.doe",
    email: "john@example.com",
    roles: ["USER"],
    provider: "google",
    deviceId: "dev-456",
    iat: 1718610000,
    exp: 1718613600,
    iss: "auth.example.com",
    aud: ["my-app"],
  };

  const requestMock = {
    requestId: "req-123",
    deviceId: "dev-456",
    userAgent: {
      browser: { name: "Chrome", version: "114.0" },
      device: "android",
      ip: "192.168.0.1",
      os: { name: "Android", version: "13" },
      userAgent: "Mozilla/5.0 (Linux; Android 13; ...)",
    },
    user: claimsMock,
  } as Request;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContextService,
        {
          provide: AsyncStorageService,
          useValue: asyncStorageServiceMock,
        },
      ],
    }).compile();

    service = module.get<ContextService>(ContextService);
  });

  describe("getRequestId", () => {
    beforeEach(() => {
      asyncStorageServiceMock.getRequest.mockReset();
    });
    it("should return requestId", () => {
      asyncStorageServiceMock.getRequest.mockReturnValue(requestMock);
      expect(service.getRequestId()).toBe("req-123");
    });
  });

  describe("getDeviceId", () => {
    beforeEach(() => {
      asyncStorageServiceMock.getRequest.mockReset();
    });
    it("should return deviceId", () => {
      asyncStorageServiceMock.getRequest.mockReturnValue(requestMock);
      expect(service.getDeviceId()).toBe("dev-456");
    });
  });

  describe("getUserAgent", () => {
    beforeEach(() => {
      asyncStorageServiceMock.getRequest.mockReset();
    });
    it("should return userAgent", () => {
      asyncStorageServiceMock.getRequest.mockReturnValue(requestMock);
      expect(service.getUserAgent()).toEqual(requestMock.userAgent);
    });

    it("should return userAgent.device", () => {
      asyncStorageServiceMock.getRequest.mockReturnValue(requestMock);
      expect(service.getUserAgent().device).toBe("android");
    });
  });

  describe("getUser", () => {
    beforeEach(() => {
      asyncStorageServiceMock.getRequest.mockReset();
    });
    it("should return user object (claims)", () => {
      asyncStorageServiceMock.getRequest.mockReturnValue(requestMock);
      expect(service.getUser()).toEqual(claimsMock);
      expect(service.getUser()?.username).toBe("john.doe");
      expect(service.getUser()?.roles).toContain("USER");
    });

    it("should return null if user is not present", () => {
      requestMock.user = undefined;
      asyncStorageServiceMock.getRequest.mockReturnValue(requestMock);

      expect(service.getUser()).toBeNull();
    });
  });

  describe("getExecutionTime", () => {
    const requestStartTimeMock = Date.now();
    const endTimeMock = Date.now();
    const dateNowSpy = jest.spyOn(Date, "now");
    const resultMock = { startTime: requestStartTimeMock, endTime: endTimeMock };
    beforeEach(() => {
      asyncStorageServiceMock.getRequestStartTime.mockReset();
      dateNowSpy.mockReset();
    });
    it("should return executionTime", () => {
      asyncStorageServiceMock.getRequestStartTime.mockReturnValue(requestStartTimeMock);
      dateNowSpy.mockReturnValue(endTimeMock);

      const result = service.getExecutionTime();

      expect(asyncStorageServiceMock.getRequestStartTime).toHaveBeenCalled();
      expect(result).toStrictEqual(resultMock);
    });
  });

  describe("getTimestamp", () => {
    it("should return timestamp", () => {
      const result = service.getTimestamp();

      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
    });
  });
});
