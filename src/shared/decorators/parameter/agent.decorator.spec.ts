import { ExecutionContext } from "@nestjs/common";
import { ROUTE_ARGS_METADATA } from "@nestjs/common/constants";
import { UserAgent } from "src/utils/ua";
import { Agent } from "./agent.decorator";

jest.mock("src/utils/ua", () => ({
  UserAgent: {
    parse: jest.fn(),
  },
}));

describe("Agent Decorator", () => {
  function getFactory(decorator: Function) {
    class TestClass {
      method(@decorator() _value: unknown) {}
    }

    const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, TestClass, "method");
    const key = Object.keys(args)[0];
    return args[key].factory;
  }

  it("should return parsed user agent from request", () => {
    const mockParsedUA = { browser: "Chrome", os: "Windows" };
    (UserAgent.parse as jest.Mock).mockReturnValue(mockParsedUA);

    const mockRequest = {
      headers: { "user-agent": "some-agent-string" },
    };

    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as unknown as ExecutionContext;

    const factory = getFactory(Agent);
    const result = factory(null, mockContext);

    expect(UserAgent.parse).toHaveBeenCalledWith(mockRequest);
    expect(result).toEqual(mockParsedUA);
  });
});
