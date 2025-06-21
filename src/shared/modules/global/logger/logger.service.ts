import { createLogger, Logger } from "winston";
import { Injectable } from "@nestjs/common";
import { winstonConfig } from "src/config/winston.config";

@Injectable()
export class LoggerService {
  private readonly _ws: Logger;

  constructor() {
    this._ws = createLogger(winstonConfig.options);
  }

  get ws() {
    return this._ws;
  }
}
