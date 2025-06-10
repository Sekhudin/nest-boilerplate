import { CallHandler, ExecutionContext } from "@nestjs/common";
import { of } from "rxjs";
import { LoggerService } from "src/shared/services/logger.service";
import { HttpInterceptor } from "./http.interceptor";

describe("HttpInterceptor", () => {
  let interceptor: HttpInterceptor;
  let logger: LoggerService;

  beforeEach(() => {
    logger = { ws: { http: jest.fn() } } as any;
    interceptor = new HttpInterceptor(logger);
  });

  it("should log HTTP request", async () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({ method: "GET", url: "/test", headers: {}, query: {}, body: {} }),
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
