import { Request } from "express";
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { LoggerService } from "src/shared/services/logger.service";
import { JsonLogFormatter } from "../classes/JsonLogFormatter";

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<Request>();
    const statusCode = (context.switchToHttp().getResponse().statusCode as number) ?? 200;
    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const endTime = Date.now();
        const log = JsonLogFormatter.http({ req, startTime, endTime, statusCode });
        this.logger.ws.http("HTTP_REQUEST", log);
      }),
    );
  }
}
