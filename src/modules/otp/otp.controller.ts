import { Body, Controller, Post } from "@nestjs/common";
import { OtpVerifyLinkDto } from "./dto/otp-verify-link.dto";
import { OtpVerifyDto } from "./dto/otp-verify.dto";
import { OtpService } from "./otp.service";

@Controller("otp")
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post("verify")
  otpVerify(@Body() otpVerifyDto: OtpVerifyDto) {
    return this.otpService.verify(otpVerifyDto);
  }

  @Post("verify/link")
  otpVerifyLink(@Body() otpVerifyLinkDto: OtpVerifyLinkDto) {
    return this.otpService.verifyLink(otpVerifyLinkDto);
  }
}
