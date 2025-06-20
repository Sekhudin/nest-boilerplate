import z from "zod/v4";
import * as zr from "./schema";

const environmentSchema = z.object({
  APP_NAME: zr.string(),
  APP_PORT: zr.number(),
  APP_ENV: zr.mode(),
  APP_VERSION: zr.semver("APP_VERSION"),
  APP_TIMEZONE: zr.timezone(),
  APP_LOCALE: zr.locale(),
  APP_API_DOCS_PATH: zr.path(),
  DB_TYPE: zr.database(),
  DB_HOST: zr.string("DB_HOST"),
  DB_PORT: zr.number(),
  DB_USERNAME: zr.string("DB_USERNAME"),
  DB_PASSWORD: zr.string("DB_PASSWORD"),
  DB_NAME: zr.string("DB_NAME"),
  DB_SCHEMA: zr.string("DB_SCHEMA"),
  DB_SYNCHRONIZE: zr.boolean(),
  DB_SSL: zr.boolean(),
  DB_POOL_SIZE: zr.number(),
  DB_MIGRATION_TABLE: zr.string("DB_MIGRATION_TABLE"),
  JWT_ALGORITHM: zr.algorithm(),
  JWT_ISSUER: zr.string("backend"),
  JWT_AUDIENCE: zr.string("frontend"),
  JWT_REFRESH_SECRET: zr.secret("JWT_REFRESH_SECRET", 32),
  JWT_REFRESH_EXPIRES_IN: zr.expirein(),
  JWT_ACCESS_SECRET: zr.secret("JWT_ACCESS_SECRET", 32),
  JWT_ACCESS_EXPIRES_IN: zr.expirein(),
  HASH_SECRET: zr.secret("HASH_SECRET", 32),
  HASH_SALT: zr.secret("HASH_SALT", 16),
  ENCRYPTION_KEY: zr.secret("ENCRYPTION_KEY", 32),
  ENCRYPTION_IV: zr.secret("ENCRYPTION_IV", 16),
  ENCRYPTION_ALGO: zr.encryptalgo(),
  CORS_ORIGIN: zr.split(),
  CORS_METHODS: zr.split(),
  CORS_HEADERS: zr.split(),
  CORS_CREDENTIALS: zr.boolean(),
  COOKIE_DOMAIN: z.string(),
  COOKIE_SECURE: zr.boolean(),
  COOKIE_HTTP_ONLY: zr.boolean(),
  COOKIE_SAME_SITE: zr.samesite(),
  COOKIE_MAX_AGE: zr.milliseconds(),
  COOKIE_PATH: zr.path(),
  COOKIE_PRIORITY: zr.priority(),
  LOG_LEVEL_GLOBAL: zr.loglevel(),
  LOG_LEVEL: zr.loglevel(),
  LOG_DIR: zr.path(),
  LOG_FORMAT: zr.logformat(),
  LOG_MAX_SIZE: zr.bytes(),
  LOG_MAX_FILES: zr.number(),
  THROTTLER_TTL: zr.number(),
  THROTTLER_LIMIT: zr.number(),
  FEATURE_DEBUG_ENABLED: zr.boolean(),
  FEATURE_API_DOCS_ENABLED: zr.boolean(),
  FEATURE_DB_LOGGING_ENABLED: zr.boolean(),
  FEATURE_THROTTLER_ENABLED: zr.boolean(),
  FEATURE_SIGNUP_ENABLED: zr.boolean(),
});

export type Environment = Required<z.infer<typeof environmentSchema>>;

export const envpath = ".env";
export const environment = (value: unknown) => {
  const parsed = environmentSchema.safeParse(value);
  if (!parsed.success) {
    throw z.prettifyError(parsed.error);
  }
  return parsed.data;
};
