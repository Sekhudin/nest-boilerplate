import { environment, Environment } from "./environment";

describe("environment", () => {
  const validEnvironment: Record<keyof Environment, string> = {
    APP_NAME: "MyApp",
    APP_PORT: "3000",
    APP_ENV: "development",
    APP_VERSION: "1.0.0",
    APP_TIMEZONE: "Asia/Jakarta",
    APP_LOCALE: "id",
    APP_API_DOCS_PATH: "/docs",
    APP_FRONTEND_URL: "http://localhost:3000",
    DB_TYPE: "postgres",
    DB_HOST: "localhost",
    DB_PORT: "5432",
    DB_NAME: "mydb",
    DB_USERNAME: "user",
    DB_PASSWORD: "pass",
    DB_SCHEMA: "public",
    DB_SYNCHRONIZE: "false",
    DB_SSL: "false",
    DB_POOL_SIZE: "10",
    DB_MIGRATION_TABLE: "migrations",
    JWT_ALGORITHM: "HS256",
    JWT_ISSUER: "my-app",
    JWT_AUDIENCE: "my-app",
    JWT_REFRESH_SECRET: "x".repeat(32),
    JWT_REFRESH_EXPIRES_IN: "1d",
    JWT_ACCESS_SECRET: "y".repeat(32),
    JWT_ACCESS_EXPIRES_IN: "10m",
    HASH_PASSWORD_SECRET: "z".repeat(32),
    HASH_PASSWORD_SALT: "s".repeat(16),
    HASH_OTP_SECRET: "o".repeat(32),
    HASH_OTP_SALT: "p".repeat(16),
    ENCRYPTION_KEY: "e".repeat(32),
    ENCRYPTION_ALGO: "aes-256-cbc",
    AUTHENTICATOR_SECRET: "a".repeat(32),
    TOTP_SECRET: "t".repeat(32),
    HOTP_SECRET: "h".repeat(32),
    CORS_ORIGIN: "http://localhost",
    CORS_METHODS: "GET,POST",
    CORS_HEADERS: "Content-Type",
    CORS_CREDENTIALS: "true",
    COOKIE_DOMAIN: "localhost",
    COOKIE_SECURE: "false",
    COOKIE_HTTP_ONLY: "true",
    COOKIE_SAME_SITE: "lax",
    COOKIE_MAX_AGE: "1h",
    COOKIE_PATH: "/",
    COOKIE_PRIORITY: "high",
    OTP_MAIL_HOST: "smtp.mail.com",
    OTP_MAIL_PORT: "587",
    OTP_MAIL_USER: "otp@mail.com",
    OTP_MAIL_PASS: "otppass",
    MAGIC_LINK_VERIFY_EMAIL_PATH: "/verify-email",
    MAGIC_LINK_RESET_PASSWORD_PATH: "/reset-password",
    BILLING_MAIL_HOST: "smtp.billing.com",
    BILLING_MAIL_PORT: "587",
    BILLING_MAIL_USER: "billing@mail.com",
    BILLING_MAIL_PASS: "billingpass",
    NEWSLETTER_MAIL_HOST: "smtp.newsletter.com",
    NEWSLETTER_MAIL_PORT: "587",
    NEWSLETTER_MAIL_USER: "newsletter@mail.com",
    NEWSLETTER_MAIL_PASS: "newsletterpass",
    MAILER_DOMAIN: "mail.domain.com",
    THROTTLER_TTL: "60",
    THROTTLER_LIMIT: "100",
    LOG_LEVEL_GLOBAL: "debug",
    LOG_LEVEL: "info",
    LOG_DIR: "/logs",
    LOG_FORMAT: "json",
    LOG_MAX_SIZE: "2mb",
    LOG_MAX_FILES: "10",
    FEATURE_DEBUG_ENABLED: "true",
    FEATURE_API_DOCS_ENABLED: "true",
    FEATURE_DB_LOGGING_ENABLED: "false",
    FEATURE_THROTTLER_ENABLED: "true",
    FEATURE_SIGNUP_ENABLED: "true",
  };

  it("should parse environment without error", () => {
    expect(() => environment(validEnvironment)).not.toThrow();
    const parsed = environment(validEnvironment);
    expect(parsed.APP_NAME).toBe("MyApp");
    expect(typeof parsed.APP_PORT).toBe("number");
  });

  it("should throw error for invalid schema", () => {
    const brokenEnv = { ...validEnvironment, APP_PORT: undefined };
    expect(() => environment(brokenEnv)).toThrow();
  });
});
