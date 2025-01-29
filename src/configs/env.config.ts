import * as dotEnv from "dotenv";
import { env, NODE_ENV, EnvPath, isMatch, isProduction, pathDir } from "./constant";
dotEnv.config({ path: EnvPath });

/** Mode and Application */
export const APP_MODE = NODE_ENV;
export const APP_NAME = env(process.env.APP_NAME, "app");
export const APP_PORT = env(process.env.APP_PORT, "5000");
export const APP_VERSION = env(process.env.APP_VERSION, "1.0");
export const APP_UPLOAD_DIR = env(process.env.APP_UPLOAD_DIR, "uploads");

/** Database */
export const DB_TYPE = env(process.env.DB_TYPE);
export const DB_HOST = env(process.env.DB_HOST);
export const DB_PORT = env(process.env.DB_PORT);
export const DB_NAME = env(process.env.DB_NAME);
export const DB_SCHEMA = env(process.env.DB_SCHEMA);
export const DB_USERNAME = env(process.env.DB_USERNAME);
export const DB_PASSWORD = env(process.env.DB_PASSWORD);
export const DB_MIGRATION_TABLE = env(process.env.DB_MIGRATION_TABLE, "migrations");

/** JSON Web Token */
export const JWT_ROLE_KEY = env(process.env.JWT_ROLE_KEY, "roles");
export const JWT_REFRESH_NAME = env(process.env.JWT_REFRESH_NAME, "refresh");
export const JWT_REFRESH_SECRET = env(process.env.JWT_REFRESH_SECRET);
export const JWT_REFRESH_COOKIE = env(process.env.JWT_REFRESH_COOKIE, "refreshToken");
export const JWT_REFRESH_EXPIRATION = env(process.env.JWT_REFRESH_EXPIRATION, "7d");

export const JWT_ACCESS_NAME = env(process.env.JWT_ACCESS_NAME, "access");
export const JWT_ACCESS_SECRET = env(process.env.JWT_ACCESS_SECRET);
export const JWT_ACCESS_EXPIRATION = env(process.env.JWT_ACCESS_EXPIRATION, "1d");

/** Hashing */
export const ARGON_SECRET = env(process.env.ARGON_KEY);
export const ARGON_SALT = env(process.env.ARGON_SALT);

/** Logging */
export const LOG_DIR = env(process.env.LOG_DIR, "logs");
export const LOG_LEVEL = env(process.env.LOG_LEVEL, "error");
export const LOG_MAX_SIZE = env(process.env.LOG_MAX_SIZE, "2");
export const LOG_MAX_FILES = env(process.env.LOG_MAX_FILES, "10");

/** Throttling */
export const THROTTLER_ACTIVE = env(process.env.THROTTLER_ACTIVE, "true");
export const THROTTLER_TTL = env(process.env.THROTTLER_TTL, "1");
export const THROTTLER_LIMIT = env(process.env.THROTTLER_LIMIT, "100");

/** Utility */
export { isMatch, isProduction, pathDir };
