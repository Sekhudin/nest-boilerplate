import { Request, Response } from "express";
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { appConfig } from "src/config/app.config";
import { JsonLogFormatter } from "src/shared/classes/json-log-formatter";
import { LoggerService } from "src/shared/modules/global/logger/logger.service";

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

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      if (!appConfig.isProduction && statusCode < 500) {
        this.logger.ws.warn("HTTP_EXCEPTION", JsonLogFormatter.httpError({ req, exception }));
      }

      if (statusCode >= 500) {
        this.logger.ws.error("HTTP_EXCEPTION", JsonLogFormatter.httpError({ req, exception }));
      }
      httpAdapter.reply(res, exception.getResponse(), statusCode);
    } else {
      const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      const body = new InternalServerErrorException("Something went wrong!.").getResponse();
      this.logger.ws.error(
        "UNKNOWN_EXCEPTION",
        JsonLogFormatter.unknownError({ req, statusCode, exception }),
      );
      httpAdapter.reply(res, body, statusCode);
    }
  }
}
