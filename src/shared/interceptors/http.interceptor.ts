import { Request } from "express";
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { JsonLogFormatter } from "src/shared/classes/json-log-formatter";
import { LoggerService } from "src/shared/services/logger.service";

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
