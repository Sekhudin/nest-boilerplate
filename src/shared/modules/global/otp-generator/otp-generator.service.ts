import OTP from "otp";
import { Inject, Injectable } from "@nestjs/common";
import { otpConfig } from "src/config/otp.config";

@Injectable()
export class OtpGeneratorService {
  constructor(@Inject(otpConfig.INJECTOR_KEY) private readonly otp: OTP) {}

  generateTotp() {
    return this.otp.totp(Date.now());
  }
}
