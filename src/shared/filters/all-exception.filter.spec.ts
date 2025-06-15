import { ArgumentsHost, HttpException, HttpStatus, InternalServerErrorException } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { LoggerService } from "src/shared/modules/global/logger/logger.service";
import { AllExceptionFilter } from "./all-exception.filter";

jest.mock("src/config/app.config", () => ({
  appConfig: {
    isNotProduction: true,
  },
}));

describe("AllExceptionFilter", () => {
  let filter: AllExceptionFilter;
  let logger: LoggerService;
  let httpAdapterHost: HttpAdapterHost;

  const mockReply = jest.fn();

  const mockLogger = {
    ws: {
      warn: jest.fn(),
      error: jest.fn(),
    },
  };

  const mockHttpAdapterHost = {
    httpAdapter: {
      reply: mockReply,
    },
  };

  const createMockHost = (req = {}, res = {}) =>
    ({
      switchToHttp: () => ({
        getRequest: () => req,
        getResponse: () => res,
      }),
    }) as unknown as ArgumentsHost;

  beforeEach(() => {
    jest.clearAllMocks();
    logger = mockLogger as unknown as LoggerService;
    httpAdapterHost = mockHttpAdapterHost as unknown as HttpAdapterHost;
    filter = new AllExceptionFilter(httpAdapterHost, logger);
  });

  it("should handle HttpException with status < 500 in non-production", () => {
    const exception = new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
    const mockHost = createMockHost({ method: "GET", path: "/", query: {} }, {});

    filter.catch(exception, mockHost);

    expect(mockLogger.ws.warn).toHaveBeenCalledWith(
      "HTTP_EXCEPTION",
      expect.objectContaining({ statusCode: 400 }),
    );
    expect(mockReply).toHaveBeenCalledWith({}, "Bad Request", 400);
  });

  it("should handle HttpException with status >= 500", () => {
    const exception = new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    const mockHost = createMockHost({ method: "GET", path: "/", query: {} }, {});

    filter.catch(exception, mockHost);

    expect(mockLogger.ws.error).toHaveBeenCalledWith(
      "HTTP_EXCEPTION",
      expect.objectContaining({ statusCode: 500 }),
    );
    expect(mockReply).toHaveBeenCalledWith({}, "Server Error", 500);
  });

  it("should handle unknown exception", () => {
    const unknownError = new Error("Something went wrong");
    const mockHost = createMockHost({ method: "POST", path: "/error", query: {} }, {});

    filter.catch(unknownError, mockHost);

    expect(mockLogger.ws.error).toHaveBeenCalledWith(
      "UNKNOWN_EXCEPTION",
      expect.objectContaining({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: unknownError,
      }),
    );

    expect(mockReply).toHaveBeenCalledWith(
      {},
      new InternalServerErrorException("Something went wrong!.").getResponse(),
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  });
});
