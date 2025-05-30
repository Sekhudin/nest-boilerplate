import z from "zod";

const BOOLEANS = ["true", "false"] as const;

const MODES = ["development", "production", "test"] as const;

const DATABASES = ["postgres", "mysql", "mariadb", "sqlite"] as const;

const LOCALES = ["id", "id-ID", "en", "en-US", "en-GB", "ja-JP", "fr-FR"] as const;

const LOG_LEVELS = ["error", "warn", "info", "http", "verbose", "debug", "silly"] as const;

const LOG_FORMATS = ["json", "plain", "pretty"] as const;

const TIMEZONES = [
  "UTC",
  "Asia/Jakarta",
  "Asia/Makassar",
  "Asia/Jayapura",
  "America/New_York",
  "Europe/London",
  "Asia/Tokyo",
  "Europe/Paris",
  "Australia/Sydney",
  "America/Los_Angeles",
] as const;

const ALGORITHMS = ["HS256", "RS256", "ES256"] as const;

const ENCRYPT_ALGORITHMS = ["aes-256-cbc", "aes-256-gcm"] as const;

const EXPIRES_IN = ["10m", "15m", "30m", "1h", "1d", "7d", "30d"] as const;

const splitter = (value: string) => value.split(",").map((v) => v.trim());

export const string = (field: string = "field") => z.string().trim().min(1, `${field} can't be empty`);

export const split = () => z.string().min(1).transform(splitter);

export const mode = () => z.enum(MODES);

export const locale = () => z.enum(LOCALES);

export const database = () => z.enum(DATABASES);

export const path = () => z.string().startsWith("/");

export const timezone = () => z.enum(TIMEZONES);

export const loglevel = () => z.enum(LOG_LEVELS);

export const logformat = () => z.enum(LOG_FORMATS);

export const algorithm = () => z.enum(ALGORITHMS);

export const encryptalgo = () => z.enum(ENCRYPT_ALGORITHMS);

export const expirein = () => z.enum(EXPIRES_IN);

export const boolean = () => z.enum(BOOLEANS).transform((value) => value === "true");

export const number = () => z.string().transform(Number);

export const secret = (field: string, min: number) => {
  return z.string().trim().min(min, `${field} must be at least ${min} characters long`);
};

export const semver = (field: string = "field") => {
  return z.string().regex(/^\d+\.\d+\.\d+$/, `${field} must be valid semver (e.g., 1.0.0)`);
};
