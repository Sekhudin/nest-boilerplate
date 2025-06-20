import { Request } from "express";
import { of } from "rxjs";
import { CallHandler, ExecutionContext } from "@nestjs/common";
import { LoggerService } from "src/shared/modules/global/logger/logger.service";
import { Claims } from "src/shared/dto/claims.dto";
import { HttpInterceptor } from "./http.interceptor";

describe("HttpInterceptor", () => {
  let interceptor: HttpInterceptor;
  let logger: LoggerService;

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
    method: "GET",
    url: "/test",
    headers: {},
    query: {},
    body: {},
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
    logger = { ws: { http: jest.fn() } } as any;
    interceptor = new HttpInterceptor(logger);
  });

  it("should log HTTP request", async () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
        getResponse: () => ({ statusCode: 200 }),
      }),
    } as unknown as ExecutionContext;

    const mockHandler: CallHandler = {
      handle: () => of("response"),
    };

    const result = await interceptor.intercept(mockContext, mockHandler);
    result.subscribe(() => {
      expect(logger.ws.http).toHaveBeenCalled();
    });
  });
});
