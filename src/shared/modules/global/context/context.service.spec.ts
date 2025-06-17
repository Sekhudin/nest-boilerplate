import { Request } from "express";
import { Claims } from "src/shared/dto/claims.dto";
import { AsyncStorageService } from "./async-storage.service";
import { ContextService } from "./context.service";

describe("ContextService", () => {
  let service: ContextService;
  let mockAsyncStorageService: Partial<AsyncStorageService>;

  const mockUser: Claims = {
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

  const mockRequest: Partial<Request> = {
    requestId: "req-123",
    deviceId: "dev-456",
    userAgent: {
      browser: { name: "Chrome", version: "114.0" },
      device: "android",
      ip: "192.168.0.1",
      os: { name: "Android", version: "13" },
      userAgent: "Mozilla/5.0 (Linux; Android 13; ...)",
    },
    user: mockUser,
  };

  beforeEach(() => {
    mockAsyncStorageService = {
      getRequest: jest.fn().mockReturnValue(mockRequest),
    };

    service = new ContextService(mockAsyncStorageService as AsyncStorageService);
  });

  it("should return requestId", () => {
    expect(service.getRequestId()).toBe("req-123");
  });

  it("should return deviceId", () => {
    expect(service.getDeviceId()).toBe("dev-456");
  });

  it("should return userAgent", () => {
    expect(service.getUserAgent()).toEqual(mockRequest.userAgent);
  });

  it("should return userAgent.device", () => {
    expect(service.getUserAgent().device).toBe("android");
  });

  it("should return user object (claims)", () => {
    expect(service.getUser()).toEqual(mockUser);
    expect(service.getUser()?.username).toBe("john.doe");
    expect(service.getUser()?.roles).toContain("USER");
  });

  it("should return null if user is not present", () => {
    const mockRequestWithoutUser = { ...mockRequest, user: undefined };
    (mockAsyncStorageService.getRequest as jest.Mock).mockReturnValue(mockRequestWithoutUser);

    expect(service.getUser()).toBeNull();
  });
});
