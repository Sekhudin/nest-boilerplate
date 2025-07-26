import { Body, Controller, Post } from "@nestjs/common";
import { MetaService } from "src/shared/modules/global/meta/meta.service";
import { Serialize } from "src/shared/decorators/method/serialize.decorator";
import { VerifyEmailLinkDto } from "./dto/requests/verify-email-link.dto";
import { VerifyEmailOtpDto } from "./dto/requests/verify-email-otp.dto";
import { OtpSingleResponse } from "./dto/responses/otp-single.response";
import { VerifyEmailLinkUseCase } from "./use-cases/verify-email-link.use-case";
import { VerifyEmailOtpUseCase } from "./use-cases/verify-email-otp.use-case";

@Controller("otp")
export class OtpController {
  constructor(
    private readonly verifyEmailOtpUseCase: VerifyEmailOtpUseCase,
    private readonly verifyEmailLinkUseCase: VerifyEmailLinkUseCase,
    private readonly metaService: MetaService,
  ) {}

  @Post("verify/email")
  @Serialize(OtpSingleResponse)
  async verifyEmailOtp(@Body() verifyEmailOtpDto: VerifyEmailOtpDto) {
    const otp = await this.verifyEmailOtpUseCase.execute(verifyEmailOtpDto);
    return OtpSingleResponse.from(otp, this.metaService.build());
  }

  @Post("verify-link/email")
  @Serialize(OtpSingleResponse)
  async verifyEmailLink(@Body() verifyEmailLinkDto: VerifyEmailLinkDto) {
    const otp = await this.verifyEmailLinkUseCase.execute(verifyEmailLinkDto);
    return OtpSingleResponse.from(otp, this.metaService.build());
  }
}
