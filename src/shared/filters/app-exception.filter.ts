import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpExceptionBody,
  HttpStatus,
  InternalServerErrorException,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { Response } from "express";
import { TypeORMError } from "typeorm";
import { LoggerService } from "src/shared/services/logger.service";

const ExceptionDidCatch = [InternalServerErrorException, TypeORMError];
type Exception = (typeof ExceptionDidCatch)[number];
@Catch(...ExceptionDidCatch)
export class AppExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: LoggerService,
  ) {}

  catch(exception: Exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { httpAdapter } = this.httpAdapterHost;

    const errorBody: HttpExceptionBody = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: "Internal Server Error",
      message: "internal server error",
    };

    if (exception instanceof TypeORMError) {
      this.logger.error("DB error");
    } else {
      this.logger.error("Server error");
    }

    httpAdapter.reply(response, errorBody, errorBody.statusCode);
  }
}
