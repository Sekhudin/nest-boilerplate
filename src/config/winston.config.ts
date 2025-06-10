import path from "path";
import safeStringify from "fast-safe-stringify";
import { config, format, LoggerOptions, transports } from "winston";
import { consoleFormat } from "winston-console-format";
import DailyRotateFile from "winston-daily-rotate-file";
import { BaseConfig } from "./base.config";

class WinstonConfig extends BaseConfig {
  private readonly _transportConsole: transports.ConsoleTransportInstance;
  private readonly _transportFile: DailyRotateFile;
  private readonly _transportHttp: DailyRotateFile;
  private readonly _sensitiveData: Set<string>;

  constructor() {
    super();

    this._sensitiveData = new Set([
      "password",
      "token",
      "accessToken",
      "refreshToken",
      "email",
      "phone",
      "cvv",
      "sex",
      "age",
    ]);

    this._transportConsole = new transports.Console({
      level: this.env.LOG_LEVEL_GLOBAL,
      format: this.consoleFormat,
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
    config.addColors(this.colors);
    return {
      levels: this.levels,
      transports: [this._transportConsole, this._transportFile, this._transportHttp],
      exitOnError: false,
      defaultMeta: { _app: this.env.APP_NAME, _version: this.env.APP_VERSION, _env: this.env.APP_ENV },
      format: format.combine(
        format.timestamp(),
        format.splat(),
        format.errors({ stack: true, cause: true }),
        format.json(),
      ),
    };
  }

  private get format() {
    switch (this.env.LOG_FORMAT) {
      case "json":
        return format.combine(this.formatMaskSensitive()(), format.json());

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

  private get consoleFormat() {
    return format.combine(
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
    );
  }

  private get levels() {
    return {
      error: 0,
      warn: 1,
      http: 2,
      info: 3,
      verbose: 4,
      debug: 5,
      silly: 6,
    };
  }

  private get colors() {
    return {
      error: "red",
      warn: "yellow",
      http: "magenta",
      info: "green",
      verbose: "cyan",
      debug: "blue",
      silly: "grey",
    };
  }

  private formatMaskSensitive() {
    return format((transformValue) => {
      const safeValue = safeStringify(transformValue, (key, value) => {
        if (this._sensitiveData.has(key)) {
          return "*****";
        }
        return value;
      });
      return JSON.parse(safeValue) as any;
    });
  }
}

export const winstonConfig = WinstonConfig.getInstance();
