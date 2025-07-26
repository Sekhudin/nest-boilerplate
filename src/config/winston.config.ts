import path from "path";
import safeStringify from "fast-safe-stringify";
import { config, format, LoggerOptions, transports } from "winston";
import { consoleFormat } from "winston-console-format";
import DailyRotateFile from "winston-daily-rotate-file";
import { BaseConfig } from "./base.config";

class WinstonConfig extends BaseConfig {
  constructor() {
    super();
  }

  private readonly LEVELS = {
    error: 0,
    warn: 1,
    http: 2,
    info: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  } as const;

  private readonly COLORS = {
    error: "red",
    warn: "yellow",
    http: "magenta",
    info: "green",
    verbose: "cyan",
    debug: "blue",
    silly: "grey",
  } as const;

  private readonly SENSITIVE_DATA = new Set([
    "password",
    "confirmPassword",
    "token",
    "accessToken",
    "refreshToken",
    "otpCode",
    "email",
    "phone",
    "cvv",
    "sex",
    "age",
  ]);

  private readonly transportConsole = new transports.Console({
    level: this.env.LOG_LEVEL_GLOBAL,
    format: this.consoleFormat(),
  });

  private readonly transportFile = new DailyRotateFile({
    level: this.env.LOG_LEVEL,
    dirname: path.join(process.cwd(), this.env.LOG_DIR),
    filename: `application-%DATE%.log`,
    datePattern: "YYYY-MM-DD",
    zippedArchive: false,
    maxSize: this.env.LOG_MAX_SIZE,
    maxFiles: this.env.LOG_MAX_FILES,
    format: this.format(),
  });

  private readonly transportHttp = new DailyRotateFile({
    level: "http",
    dirname: path.join(process.cwd(), this.env.LOG_DIR),
    filename: `http-requests-%DATE%.log`,
    datePattern: "YYYY-MM-DD",
    zippedArchive: false,
    maxSize: this.env.LOG_MAX_SIZE,
    maxFiles: this.env.LOG_MAX_FILES,
    format: this.format(),
  });

  get loggerOptions(): LoggerOptions {
    config.addColors(this.COLORS);
    return {
      levels: this.LEVELS,
      transports: [this.transportConsole, this.transportFile, this.transportHttp],
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

  private format() {
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

  private consoleFormat() {
    return format.combine(
      format.colorize({ level: true }),
      format.padLevels(),
      this.formatMaskSensitive()(),
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

  private formatMaskSensitive() {
    return format(({ queryParams, body, ...value }) => {
      const safeValue = safeStringify({ queryParams, body }, (key, value) => {
        if (this.SENSITIVE_DATA.has(key)) {
          return "*****";
        }
        return value;
      });
      return { ...value, ...JSON.parse(safeValue) };
    });
  }
}

export const winstonConfig = WinstonConfig.getInstance();
