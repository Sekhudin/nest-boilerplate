import path from "path";
import { JsonLogFormatter } from "src/shared/classes/JsonLogFormatter";
import { format, LoggerOptions, transports } from "winston";
import { consoleFormat } from "winston-console-format";
import DailyRotateFile from "winston-daily-rotate-file";
import { BaseConfig } from "./base.config";

class WinstonConfig extends BaseConfig {
  private readonly _transportConsole: transports.ConsoleTransportInstance;
  private readonly _transportFile: DailyRotateFile;
  private readonly _transportHttp: DailyRotateFile;

  constructor() {
    super();
    this._transportConsole = new transports.Console({
      format: format.combine(
        format.colorize({ level: true }),
        format.padLevels(),
        consoleFormat({
          showMeta: true,
          metaStrip: ["timestamp", "service", "_app", "_version", "_env"],
          inspectOptions: {
            depth: Infinity,
            colors: true,
            maxArrayLength: Infinity,
            breakLength: 80,
            compact: Infinity,
            sorted: true,
            numericSeparator: true,
          },
        }),
      ),
    });

    this._transportFile = new DailyRotateFile({
      level: this.env.LOG_LEVEL,
      dirname: path.join(process.cwd(), this.env.LOG_DIR),
      filename: `application-%DATE%.log`,
      datePattern: "YYYY-MM-DD",
      zippedArchive: false,
      maxSize: this.env.LOG_MAX_SIZE,
      maxFiles: this.env.LOG_MAX_FILES,
      format: this.format,
    });

    this._transportHttp = new DailyRotateFile({
      level: "http",
      dirname: path.join(process.cwd(), this.env.LOG_DIR),
      filename: `http-requests-%DATE%.log`,
      datePattern: "YYYY-MM-DD",
      zippedArchive: false,
      maxSize: this.env.LOG_MAX_SIZE,
      maxFiles: this.env.LOG_MAX_FILES,
      format: this.format,
    });
  }

  get options(): LoggerOptions {
    return {
      level: "silly",
      transports: [this._transportConsole, this._transportFile, this._transportHttp],
      exitOnError: false,
      defaultMeta: { _app: this.env.APP_NAME, _version: this.env.APP_VERSION, _env: this.env.APP_ENV },
      format: format.combine(
        format.timestamp(),
        format.splat(),
        format.errors({ stack: true }),
        format.json(),
      ),
    };
  }

  get format() {
    switch (this.env.LOG_FORMAT) {
      case "json":
        return format.combine(
          format((value) => {
            return JsonLogFormatter.transform(value);
          })(),
          format.json(),
        );

      case "pretty":
        return format.combine(
          format.metadata(),
          format.label({ label: `[${this.env.APP_NAME}]` }),
          format.timestamp({ format: "YYYY/MM/DD HH:mm:ss" }),
          format.printf(({ label, level, message, timestamp }) => {
            return `${label} - ${timestamp}     ${level.toUpperCase()} [${this.env.APP_ENV}] ${message}`;
          }),
        );

      default:
        return format.combine(format.timestamp(), format.simple());
    }
  }
}

export const winstonConfig = WinstonConfig.getInstance();
