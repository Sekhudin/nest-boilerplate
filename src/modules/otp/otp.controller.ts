import { Body, Controller, Post } from "@nestjs/common";
import { VerifyEmailLinkDto } from "./dto/requests/verify-email-link.dto";
import { VerifyEmailOtpDto } from "./dto/requests/verify-email-otp.dto";
import { VerifyEmailLinkUseCase } from "./use-cases/verify-email-link.use-case";
import { VerifyEmailOtpUseCase } from "./use-cases/verify-email-otp.use-case";

@Controller("otp")
export class OtpController {
  constructor(
    private readonly verifyEmailOtpUseCase: VerifyEmailOtpUseCase,
    private readonly verifyEmailLinkUseCase: VerifyEmailLinkUseCase,
  ) {}

  @Post("verify/email")
  verifyEmailOtp(@Body() verifyEmailOtpDto: VerifyEmailOtpDto) {
    return this.verifyEmailOtpUseCase.execute(verifyEmailOtpDto);
  }

  @Post("verify-link/email")
  verifyEmailLink(@Body() verifyEmailLinkDto: VerifyEmailLinkDto) {
    return this.verifyEmailLinkUseCase.execute(verifyEmailLinkDto);
  }
}
