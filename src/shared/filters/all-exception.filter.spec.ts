import { Request, Response } from "express";
import { mockDeep } from "jest-mock-extended";
import { BadRequestException, HttpStatus } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { SystemInternalErrorException } from "src/shared/exceptions/system/system-internal-error.exception";
import { getFreshJsonLogFormatterMock } from "test/mocks/classes/json-log-formatter.mock";
import { getFreshAppConfigMock } from "test/mocks/config/app.config.mock";
import { getFreshLoggerServiceMock } from "test/mocks/services/logger.service.mock";
import { getFreshArgumentHostMock } from "test/mocks/utils/argument-host.mock";
import { getFreshHttpAdapterHostMock } from "test/mocks/utils/http-adapter-host.mock";
import { AllExceptionFilter } from "./all-exception.filter";

let appConfigMock: ReturnType<typeof getFreshAppConfigMock>;
let jsonLogFormatterMock: ReturnType<typeof getFreshJsonLogFormatterMock>;
jest.mock("src/config/app.config", () => ({
  get appConfig() {
    return appConfigMock;
  },
}));

jest.mock("src/shared/classes/json-log-formatter", () => ({
  get JsonLogFormatter() {
    return jsonLogFormatterMock;
  },
}));

describe("AllExceptionFilter", () => {
  let filter: AllExceptionFilter;
  const loggerServiceMock = getFreshLoggerServiceMock();
  const httpAdapterHostMock = getFreshHttpAdapterHostMock();
  const argumentHostMock = getFreshArgumentHostMock();
  const httpArgumentHostMock = mockDeep<HttpArgumentsHost>();
  const requestMock = mockDeep<Request>();
  const responseMock = mockDeep<Response>();

  beforeEach(() => {
    appConfigMock = getFreshAppConfigMock();
    jsonLogFormatterMock = getFreshJsonLogFormatterMock();
    filter = new AllExceptionFilter(httpAdapterHostMock, loggerServiceMock);

    loggerServiceMock.ws.info.mockReset();
    loggerServiceMock.ws.warn.mockReset();
    loggerServiceMock.ws.error.mockReset();
  });

  describe("status < 500", () => {
    it("should handle HttpException with status < 500 in non-production", () => {
      (appConfigMock as any).isProduction = false;
      const exception = new BadRequestException();
      httpArgumentHostMock.getRequest.mockReturnValue(requestMock);
      httpArgumentHostMock.getResponse.mockReturnValue(responseMock);
      argumentHostMock.switchToHttp.mockReturnValue(httpArgumentHostMock);

      filter.catch(exception, argumentHostMock);

      expect(loggerServiceMock.ws.info).toHaveBeenCalledWith("ERROR_PLAIN", exception);
      expect(loggerServiceMock.ws.warn).not.toHaveBeenCalled();
      expect(httpAdapterHostMock.httpAdapter.reply).toHaveBeenCalledWith(responseMock, exception.getResponse(), 400);
    });

    it("should handle HttpException with status < 500 in production", () => {
      (appConfigMock as any).isProduction = true;
      const exception = new BadRequestException();
      httpArgumentHostMock.getRequest.mockReturnValue(requestMock);
      httpArgumentHostMock.getResponse.mockReturnValue(responseMock);
      argumentHostMock.switchToHttp.mockReturnValue(httpArgumentHostMock);

      filter.catch(exception, argumentHostMock);

      expect(loggerServiceMock.ws.info).not.toHaveBeenCalled();
      expect(loggerServiceMock.ws.warn).toHaveBeenCalledWith(
        "HTTP_EXCEPTION",
        jsonLogFormatterMock.httpError({ req: requestMock, exception }),
      );
      expect(httpAdapterHostMock.httpAdapter.reply).toHaveBeenCalledWith(responseMock, exception.getResponse(), 400);
    });
  });

  describe("status >= 500", () => {
    it("should handle HttpException with status >= 500 in non-production", () => {
      (appConfigMock as any).isProduction = false;
      const exception = new SystemInternalErrorException();
      httpArgumentHostMock.getRequest.mockReturnValue(requestMock);
      httpArgumentHostMock.getResponse.mockReturnValue(responseMock);
      argumentHostMock.switchToHttp.mockReturnValue(httpArgumentHostMock);

      filter.catch(exception, argumentHostMock);

      expect(loggerServiceMock.ws.info).toHaveBeenCalledWith("ERROR_PLAIN", exception);
      expect(loggerServiceMock.ws.error).not.toHaveBeenCalled();
      expect(httpAdapterHostMock.httpAdapter.reply).toHaveBeenCalledWith(responseMock, exception.getResponse(), 500);
    });

    it("should handle HttpException with status >= 500 in production", () => {
      (appConfigMock as any).isProduction = true;
      const exception = new SystemInternalErrorException();
      httpArgumentHostMock.getRequest.mockReturnValue(requestMock);
      httpArgumentHostMock.getResponse.mockReturnValue(responseMock);
      argumentHostMock.switchToHttp.mockReturnValue(httpArgumentHostMock);

      filter.catch(exception, argumentHostMock);

      expect(loggerServiceMock.ws.info).not.toHaveBeenCalled();
      expect(loggerServiceMock.ws.error).toHaveBeenCalledWith(
        "HTTP_EXCEPTION",
        jsonLogFormatterMock.httpError({ req: requestMock, exception }),
      );
      expect(httpAdapterHostMock.httpAdapter.reply).toHaveBeenCalledWith(responseMock, exception.getResponse(), 500);
    });
  });

  describe("unknown error", () => {
    it("should handle unknown exception in non-production", () => {
      (appConfigMock as any).isProduction = false;
      const error = new Error("Something went wrong");
      const exception = new SystemInternalErrorException();
      httpArgumentHostMock.getRequest.mockReturnValue(requestMock);
      httpArgumentHostMock.getResponse.mockReturnValue(responseMock);
      argumentHostMock.switchToHttp.mockReturnValue(httpArgumentHostMock);

      filter.catch(error, argumentHostMock);

      expect(loggerServiceMock.ws.info).toHaveBeenCalledWith("ERROR_PLAIN", error);
      expect(loggerServiceMock.ws.error).not.toHaveBeenCalled();
      expect(httpAdapterHostMock.httpAdapter.reply).toHaveBeenCalledWith(
        responseMock,
        exception.getResponse(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });

    it("should handle unknown exception in production", () => {
      (appConfigMock as any).isProduction = true;
      const error = new Error("Something went wrong");
      const exception = new SystemInternalErrorException();
      httpArgumentHostMock.getRequest.mockReturnValue(requestMock);
      httpArgumentHostMock.getResponse.mockReturnValue(responseMock);
      argumentHostMock.switchToHttp.mockReturnValue(httpArgumentHostMock);

      filter.catch(error, argumentHostMock);

      expect(loggerServiceMock.ws.info).not.toHaveBeenCalled();
      expect(loggerServiceMock.ws.error).toHaveBeenCalledWith(
        "UNKNOWN_EXCEPTION",
        jsonLogFormatterMock.unknownError({
          req: requestMock,
          exception,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        }),
      );
      expect(httpAdapterHostMock.httpAdapter.reply).toHaveBeenCalledWith(
        responseMock,
        exception.getResponse(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
  });
});
