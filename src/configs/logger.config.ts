import * as winston from "winston";
import * as path from "path";
import { RootDir } from "./base.config";
import * as Env from "./env.config";

export const loggerOptions: winston.LoggerOptions = {
  level: "info",
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
    new winston.transports.File({
      level: Env.LOG_LEVEL,
      dirname: path.join(RootDir, Env.LOG_DIR),
      filename: `${new Date().toISOString().split("T")[0]}_error.log`,
      maxsize: Number(Env.LOG_MAX_SIZE) * 1024 * 1024,
      maxFiles: Number(Env.LOG_MAX_FILES),
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
