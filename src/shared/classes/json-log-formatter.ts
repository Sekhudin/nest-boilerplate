import { Logform } from "winston";

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
