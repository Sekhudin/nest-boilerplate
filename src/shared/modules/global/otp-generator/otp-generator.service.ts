import { addMinutes, isBefore } from "date-fns";
import { authenticator, GeneratedOtp, hotp, totp } from "otplib";
import { Injectable } from "@nestjs/common";
import { otpConfig } from "src/config/otp.config";

@Injectable()
export class OtpGeneratorService {
  constructor() {
    authenticator.options = otpConfig.authenticatorOptions;
    hotp.options = otpConfig.hotpOptions;
    totp.options = otpConfig.totpOptions;
  }

  isOtpExpired(expiresAt: Date) {
    return isBefore(expiresAt, new Date());
  }

  generateOtp(expiresInMinutes: number = 5): GeneratedOtp {
    const code = this.generateTotp();
    const expiresAt = addMinutes(new Date(), expiresInMinutes);
    return { code, expiresAt, expiresInMinutes };
  }

  generateAuthenticator() {
    return authenticator.generate(otpConfig.SECRETS.AUTHENTICATOR);
  }

  verifyAuthenticator(token: string) {
    return authenticator.verify({ token, secret: otpConfig.SECRETS.AUTHENTICATOR });
  }

  generateHotp(counter: number) {
    return hotp.generate(otpConfig.SECRETS.HOTP, counter);
  }

  verifyHotp(plain: string, counter: number) {
    return hotp.verify({ token: plain, secret: otpConfig.SECRETS.HOTP, counter });
  }

  generateTotp() {
    return totp.generate(otpConfig.SECRETS.TOTP);
  }

  verifyTotp(plain: string) {
    return totp.verify({ token: plain, secret: otpConfig.SECRETS.TOTP });
  }
}
