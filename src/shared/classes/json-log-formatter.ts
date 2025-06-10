import { Request } from "express";
import { HttpException } from "@nestjs/common";
import { Logform } from "winston";

interface JsonHttpLogFormat {
  method?: string;
  path?: string;
  statusCode?: number;
  requestId?: string;
  userId?: string | null;
  deviceId?: string;
  userAgent?: string;
  queryParams?: Record<string, unknown> | null;
  body?: Record<string, unknown>;
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

export class JsonLogFormatter {
  constructor(value: JsonLogFormat) {
    Object.assign(this, value);
  }

  static transform(value: unknown) {
    return new JsonLogFormatter(value as JsonLogFormat) as Logform.TransformableInfo;
  }

  static http({ req, startTime, endTime, statusCode }: HttpLogParams) {
    const log: JsonLogFormat = {
      method: req.method.toUpperCase(),
      path: req.path,
      queryParams: Object.keys(req.query).length ? req.query : null,
      body: req.body ?? null,
      statusCode,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      responseTime: endTime - startTime,
      responseTimeMs: `+${endTime - startTime}ms`,
    };
    return new JsonLogFormatter(log);
  }

  static httpError({ req, exception }: HttpErrorLogParams) {
    const log: JsonLogFormat = {
      method: req.method.toUpperCase(),
      path: req.path,
      queryParams: Object.keys(req.query).length ? req.query : null,
      body: req.body ?? null,
      statusCode: exception.getStatus(),
      error: exception.getResponse(),
      userId: req.user?.sub ?? null,
    };
    return new JsonLogFormatter(log);
  }

  static unknownError({ req, statusCode, exception }: UnknownErrorLogParams) {
    const log: JsonLogFormat = {
      method: req.method.toUpperCase(),
      path: req.path,
      queryParams: Object.keys(req.query).length ? req.query : null,
      body: req.body ?? null,
      statusCode,
      error: exception,
    };
    return new JsonLogFormatter(log);
  }
}
