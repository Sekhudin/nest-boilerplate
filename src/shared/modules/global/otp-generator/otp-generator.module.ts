import { Global, Module } from "@nestjs/common";
import { OtpGeneratorService } from "./otp-generator.service";

@Global()
@Module({
  providers: [OtpGeneratorService],
  exports: [OtpGeneratorService],
})
export class OtpGeneratorModule {}
