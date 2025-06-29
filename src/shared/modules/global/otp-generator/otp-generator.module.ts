import OTP from "otp";
import { Global, Module } from "@nestjs/common";
import { otpConfig } from "src/config/otp.config";
import { OtpGeneratorService } from "./otp-generator.service";

@Global()
@Module({
  providers: [
    { provide: otpConfig.INJECTOR_KEY, useFactory: () => new OTP(otpConfig.options) },
    OtpGeneratorService,
  ],
  exports: [OtpGeneratorService],
})
export class OtpGeneratorModule {}
