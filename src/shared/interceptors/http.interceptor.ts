import { Request, Response } from "express";
import { Observable, tap } from "rxjs";
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { ContextService } from "src/shared/modules/global/context/context.service";
import { LoggerService } from "src/shared/modules/global/logger/logger.service";
import { JsonLogFormatter } from "src/shared/classes/json-log-formatter";

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  constructor(
    private readonly contextSrvice: ContextService,
    private readonly logger: LoggerService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<Request>();
    const { statusCode } = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      tap(() => {
        const { startTime, endTime } = this.contextSrvice.getExecutionTime();
        this.logger.ws.http("HTTP_REQUEST", JsonLogFormatter.http({ req, startTime, endTime, statusCode }));
      }),
    );
  }
}
