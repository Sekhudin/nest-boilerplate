import "otplib";
import type { authenticator, hotp, totp } from "otplib";

declare module "otplib" {
  type TOTPOptions = typeof totp.options;
  type HOTPOptions = typeof hotp.options;
  type AuthenticatorOptions = typeof authenticator.options;

  interface GeneratedOtp {
    code: string;
    expiresAt: Date;
    expiresInMinutes: number;
  }
}
