import { ExecutionContext } from "@nestjs/common";
import { ROUTE_ARGS_METADATA } from "@nestjs/common/constants";
import { Agent } from "./agent.decorator";

describe("Agent Decorator", () => {
  function getFactory(decorator: Function) {
    class TestClass {
      method(@decorator() _value: unknown) {}
    }

    const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, TestClass, "method");
    const key = Object.keys(args)[0];
    return args[key].factory;
  }

  it("should return userAgent from request", () => {
    const mockUserAgent = {
      browser: { name: "Chrome", version: "114.0" },
      device: "Desktop",
      ip: "192.168.1.1",
      os: { name: "Windows", version: "10" },
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
    };

    const mockRequest = {
      userAgent: mockUserAgent,
    };

    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as unknown as ExecutionContext;

    const factory = getFactory(Agent);
    const result = factory(null, mockContext);

    expect(result).toEqual(mockUserAgent);
  });
});
