import { Request, Response } from "express";
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { LoggerService } from "src/shared/modules/global/logger/logger.service";
import { JsonLogFormatter } from "src/shared/classes/json-log-formatter";
import { SystemInternalErrorException } from "src/shared/exceptions/system/system-internal-error.exception";
import { appConfig } from "src/config/app.config";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: LoggerService,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const req = context.getRequest<Request>();
    const res = context.getResponse<Response>();
    const { httpAdapter } = this.httpAdapterHost;

    if (!appConfig.isProduction) {
      this.logger.ws.info("ERROR_PLAIN", exception);
    }

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      if (appConfig.isProduction && statusCode < 500) {
        this.logger.ws.warn("HTTP_EXCEPTION", JsonLogFormatter.httpError({ req, exception }));
      }

      if (appConfig.isProduction && statusCode >= 500) {
        this.logger.ws.error("HTTP_EXCEPTION", JsonLogFormatter.httpError({ req, exception }));
      }
      httpAdapter.reply(res, exception.getResponse(), statusCode);
    } else {
      const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      const body = new SystemInternalErrorException().getResponse();
      if (appConfig.isProduction) {
        this.logger.ws.error("UNKNOWN_EXCEPTION", JsonLogFormatter.unknownError({ req, statusCode, exception }));
      }

      httpAdapter.reply(res, body, statusCode);
    }
  }
}
