import * as winston from "winston";
import * as env from "./env.config";

export const loggerOptions: winston.LoggerOptions = {
  level: "info",
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
    new winston.transports.File({
      level: "info",
      dirname: env.pathDir(env.LOG_DIR),
      filename: `${new Date().toISOString().split("T")[0]}_request.log`,
      maxsize: Number(env.LOG_MAX_SIZE) * 1024 * 1024,
      maxFiles: Number(env.LOG_MAX_FILES),
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(({ level, message, timestamp }) => {
          const formattedLevel = level.toUpperCase();
          return `${timestamp} [${formattedLevel}]\n[CAUSE]\n---------\n${message}\n---------\n`;
        }),
      ),
    }),
    new winston.transports.File({
      level: env.LOG_LEVEL,
      dirname: env.pathDir(env.LOG_DIR),
      filename: `${new Date().toISOString().split("T")[0]}_error.log`,
      maxsize: Number(env.LOG_MAX_SIZE) * 1024 * 1024,
      maxFiles: Number(env.LOG_MAX_FILES),
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(({ level, message, timestamp }) => {
          const formattedLevel = level.toUpperCase();
          return `${timestamp} [${formattedLevel}]\n[CAUSE]\n---------\n${message}\n---------\n`;
        }),
      ),
    }),
  ],
};
