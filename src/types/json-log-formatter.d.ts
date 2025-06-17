import "src/shared/classes/json-log-formatter";
import type { Request } from "express";
import type { HttpException } from "@nestjs/common";

declare module "src/shared/classes/json-log-formatter" {
  interface JsonHttpLogFormat {
    method: string;
    path: string;
    statusCode: number;
    requestId: string;
    userId: string | null;
    deviceId: string | null;
    userAgent: string;
    queryParams: Record<string, unknown> | null;
    body: Record<string, unknown>;
    startTime?: string;
    endTime?: string;
    responseTime?: number;
    responseTimeMs?: string;
  }

  interface JsonErrorLogFormat {
    level?: string;
    timestamp?: string;
    error?: unknown;
    ms?: string;
    _app?: string;
    _version?: string;
    _env?: string;
  }

  interface JsonLogFormat extends JsonHttpLogFormat, JsonErrorLogFormat {}

  interface HttpLogParams {
    req: Request;
    statusCode: number;
    startTime: number;
    endTime: number;
  }

  interface HttpErrorLogParams {
    req: Request;
    exception: HttpException;
  }

  interface UnknownErrorLogParams {
    req: Request;
    statusCode: number;
    exception: unknown;
  }
}
