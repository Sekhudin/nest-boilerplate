import { Request } from "express";
import { Observable, tap } from "rxjs";
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { LoggerService } from "src/shared/modules/global/logger/logger.service";
import { JsonLogFormatter } from "src/shared/classes/json-log-formatter";

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<Request>();
    const statusCode = (context.switchToHttp().getResponse().statusCode as number) ?? 200;
    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const endTime = Date.now();
        this.logger.ws.http("HTTP_REQUEST", JsonLogFormatter.http({ req, startTime, endTime, statusCode }));
      }),
    );
  }
}
