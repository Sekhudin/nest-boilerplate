import { createLogger, Logger } from "winston";
import { Injectable } from "@nestjs/common";
import { winstonConfig } from "src/config/winston.config";

@Injectable()
export class LoggerService {
  readonly ws: Logger;

  constructor() {
    this.ws = createLogger(winstonConfig.loggerOptions);
  }
}
