import { Request } from "express";
import { JsonHttpLogFormat, JsonLogFormat } from "src/types/global";
import { Logform } from "winston";

interface HttpLogParams {
  req: Request;
  statusCode: number;
  startTime: number;
  endTime: number;
}

export class JsonLogFormatter {
  constructor(value: JsonLogFormat) {
    Object.assign(this, value);
  }

  static transform(value: unknown) {
    return new JsonLogFormatter(value as JsonLogFormat) as Logform.TransformableInfo;
  }

  static http({ req, startTime, endTime, statusCode }: HttpLogParams) {
    const log: JsonHttpLogFormat = {
      method: req.method.toUpperCase(),
      path: req.path,
      queryParams: req.query,
      body: req.body,
      statusCode,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      responseTime: endTime - startTime,
    };

    return new JsonLogFormatter(log);
  }
}
