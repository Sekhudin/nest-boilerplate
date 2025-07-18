import { ErrorCode } from "src/shared/enums/error-code.enum";

export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  /******************************
   *           AUTH
   ******************************/
  [ErrorCode.AUTH_INVALID_CREDENTIALS]: "Invalid email or password.",
  [ErrorCode.AUTH_UNAUTHORIZED]: "Unauthorized access. Please log in first.",
  [ErrorCode.AUTH_FORBIDDEN]: "You do not have permission to access this resource.",
  [ErrorCode.AUTH_TOKEN_EXPIRED]: "Your session has expired. Please log in again.",
  [ErrorCode.AUTH_TOKEN_INVALID]: "Invalid token.",
  [ErrorCode.AUTH_CLAIMS_INVALID]: "Invalid token claims",
  [ErrorCode.AUTH_ACCOUNT_LOCKED]: "Your account is locked. Please contact support.",

  /******************************
   *           USER
   ******************************/
  [ErrorCode.USER_NOT_FOUND]: "User not found.",
  [ErrorCode.USER_ALREADY_EXISTS]: "User already exists.",
  [ErrorCode.USER_EMAIL_ALREADY_USED]: "Email is already in use.",
  [ErrorCode.USER_INACTIVE]: "User account is inactive.",

  /******************************
   *      OTP / VERIFICATION
   ******************************/
  [ErrorCode.OTP_INVALID]: "Invalid OTP code.",
  [ErrorCode.OTP_EXPIRED]: "OTP code has expired.",
  [ErrorCode.OTP_EMAIL_NOT_VERIFIED]: "Email address has not been verified.",
  [ErrorCode.OTP_MAGIC_LINK_INVALID]: "Invalid magic link.",
  [ErrorCode.OTP_MAGIC_LINK_EXPIRED]: "Magic link has expired.",

  /******************************
   *         VALIDATION
   ******************************/
  [ErrorCode.VALIDATION_FAILED]: "Validation failed.",
  [ErrorCode.VALIDATION_REQUIRED_FIELD]: "This field is required.",
  [ErrorCode.VALIDATION_INVALID_FORMAT]: "Invalid format.",
  [ErrorCode.VALIDATION_TOO_SHORT]: "Value is too short.",
  [ErrorCode.VALIDATION_TOO_LONG]: "Value is too long.",
  [ErrorCode.VALIDATION_OUT_OF_RANGE]: "Value is out of range.",
  [ErrorCode.VALIDATION_VALUE_NOT_ALLOWED]: "Value is not allowed.",

  /******************************
   *          RESOURCE
   ******************************/
  [ErrorCode.RESOURCE_NOT_FOUND]: "Resource not found.",
  [ErrorCode.RESOURCE_CONFLICT]: "Resource conflict occurred.",
  [ErrorCode.RESOURCE_LOCKED]: "Resource is locked.",

  /******************************
   *           SYSTEM
   ******************************/
  [ErrorCode.SYSTEM_INTERNAL_ERROR]: "An internal server error occurred.",
  [ErrorCode.SYSTEM_SERVICE_UNAVAILABLE]: "Service is currently unavailable.",
  [ErrorCode.SYSTEM_TIMEOUT]: "The request timed out.",
  [ErrorCode.SYSTEM_UNKNOWN_ERROR]: "An unknown error occurred.",

  /******************************
   *         PERMISSION
   ******************************/
  [ErrorCode.PERMISSION_DENIED]: "Permission denied.",
  [ErrorCode.PERMISSION_ROLE_REQUIRED]: "A specific role is required to access this resource.",
} as const;
