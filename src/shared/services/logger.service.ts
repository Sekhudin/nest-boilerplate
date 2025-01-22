import * as winston from "winston";
import { Request } from "express";
import { ConsoleLogger, Injectable } from "@nestjs/common";
import { APP_MODE, APP_NAME } from "src/configs/env.config";
import { loggerOptions } from "src/configs/logger.config";

@Injectable()
export class LoggerService {
  private readonly logger: winston.Logger;
  private readonly nestLogger: ConsoleLogger;
  constructor() {
    this.logger = winston.createLogger(loggerOptions);
    this.nestLogger = new ConsoleLogger();
  }

  private logAdapter(cb: winston.LeveledLogMethod, message: string, request?: Request) {
    if (request) {
      cb(message);
    } else {
      cb(message);
    }
  }

  appListen(url: string) {
    console.log(`[${APP_MODE}] - ${APP_NAME} run on ${url}`);
  }

  log(message: string) {
    this.nestLogger.log(message);
  }

  info(message: string, request?: Request) {
    this.logAdapter(this.logger.info, message, request);
  }

  verbose(message: string, request?: Request) {
    this.logAdapter(this.logger.verbose, message, request);
  }

  debug(message: string, request?: Request) {
    this.logAdapter(this.logger.debug, message, request);
  }

  warn(message: string, request?: Request) {
    this.logAdapter(this.logger.warn, message, request);
  }

  error(message: string, request?: Request) {
    this.logAdapter(this.logger.error, message, request);
  }
}
