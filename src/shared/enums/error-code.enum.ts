export enum ErrorCode {
  /******************************
   *           AUTH
   ******************************/
  AUTH_INVALID_CREDENTIALS = "AUTH_INVALID_CREDENTIALS",
  AUTH_UNAUTHORIZED = "AUTH_UNAUTHORIZED",
  AUTH_FORBIDDEN = "AUTH_FORBIDDEN",
  AUTH_TOKEN_EXPIRED = "AUTH_TOKEN_EXPIRED",
  AUTH_TOKEN_INVALID = "AUTH_TOKEN_INVALID",
  AUTH_ACCOUNT_LOCKED = "AUTH_ACCOUNT_LOCKED",

  /******************************
   *           USER
   ******************************/
  USER_NOT_FOUND = "USER_NOT_FOUND",
  USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS",
  USER_EMAIL_ALREADY_USED = "USER_EMAIL_ALREADY_USED",
  USER_INACTIVE = "USER_INACTIVE",

  /******************************
   *      OTP / VERIFICATION
   ******************************/
  OTP_INVALID = "OTP_INVALID",
  OTP_EXPIRED = "OTP_EXPIRED",
  OTP_INVALID_TOKEN = "OTP_INVALID_TOKEN",
  OTP_EMAIL_NOT_VERIFIED = "OTP_EMAIL_NOT_VERIFIED",
  OTP_MAGIC_LINK_INVALID = "OTP_MAGIC_LINK_INVALID",
  OTP_MAGIC_LINK_EXPIRED = "OTP_MAGIC_LINK_EXPIRED",

  /******************************
   *         VALIDATION
   ******************************/
  VALIDATION_FAILED = "VALIDATION_FAILED",

  /******************************
   *         VALIDATION COMMON
   ******************************/
  REQUIRED = "REQUIRED",

  /******************************
   *         VALIDATION STRING
   ******************************/
  STRING_INVALID = "STRING_INVALID",
  STRING_EMPTY = "STRING_EMPTY",
  STRING_TOO_SHORT = "STRING_TOO_SHORT",
  STRING_TOO_LONG = "STRING_TOO_LONG",
  STRING_INVALID_EMAIL = "STRING_INVALID_EMAIL",
  STRING_INVALID_UUID = "STRING_INVALID_UUID",
  STRING_INVALID_URL = "STRING_INVALID_URL",
  STRING_NON_MATCHING = "STRING_NON_MATCHING",

  /******************************
   *         VALIDATION NUMBER
   ******************************/
  NUMBER_INVALID = "NUMBER_INVALID",
  NUMBER_POSITIVE = "NUMBER_POSITIVE",
  NUMBER_NEGATIVE = "NUMBER_NEGATIVE",
  NUMBER_TOO_SMALL = "NUMBER_TOO_SMALL",
  NUMBER_TOO_LARGE = "NUMBER_TOO_LARGE",

  /******************************
   *         VALIDATION BOOLEAN
   ******************************/
  BOOLEAN_INVALID = "BOOLEAN_INVALID",

  /******************************
   *         VALIDATION ARRAY
   ******************************/
  ARRAY_TOO_SHORT = "ARRAY_TOO_SHORT",
  ARRAY_TOO_LONG = "ARRAY_TOO_LONG",
  ARRAY_INVALID = "ARRAY_INVALID",

  /******************************
   *         VALIDATION ENUM
   ******************************/
  ENUM_INVALID = "ENUM_INVALID",

  /******************************
   *         VALIDATION DATE
   ******************************/
  DATE_INVALID = "DATE_INVALID",
  DATE_TOO_EARLY = "DATE_TOO_EARLY",
  DATE_TOO_LATE = "DATE_TOO_LATE",

  /******************************
   *         VALIDATION PASSWORD
   ******************************/
  PASSWORD_WEAK = "PASSWORD_WEAK",
  PASSWORD_MISMATCH = "PASSWORD_MISMATCH",

  /******************************
   *          RESOURCE
   ******************************/
  RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND",
  RESOURCE_CONFLICT = "RESOURCE_CONFLICT",
  RESOURCE_LOCKED = "RESOURCE_LOCKED",

  /******************************
   *           SYSTEM
   ******************************/
  SYSTEM_INTERNAL_ERROR = "SYSTEM_INTERNAL_ERROR",
  SYSTEM_SERVICE_UNAVAILABLE = "SYSTEM_SERVICE_UNAVAILABLE",
  SYSTEM_TIMEOUT = "SYSTEM_TIMEOUT",
  SYSTEM_UNKNOWN_ERROR = "SYSTEM_UNKNOWN_ERROR",

  /******************************
   *         PERMISSION
   ******************************/
  PERMISSION_DENIED = "PERMISSION_DENIED",
  PERMISSION_ROLE_REQUIRED = "PERMISSION_ROLE_REQUIRED",

  /******************************
   *         THROTTLER
   ******************************/
  THROTTLER_TOO_MANY_REQUESTS = "THROTTLER_TOO_MANY_REQUESTS",
}
