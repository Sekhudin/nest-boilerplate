import { Body, Controller, Post } from "@nestjs/common";
import { MetaService } from "src/shared/modules/global/meta/meta.service";
import { Serialize } from "src/shared/decorators/method/serialize.decorator";
import { VerifyEmailLinkDto } from "./dto/requests/verify-email-link.dto";
import { VerifyEmailOtpDto } from "./dto/requests/verify-email-otp.dto";
import { OtpResponse } from "./dto/responses/otp.response";
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
  @Serialize(OtpResponse)
  async verifyEmailOtp(@Body() verifyEmailOtpDto: VerifyEmailOtpDto) {
    const data = await this.verifyEmailOtpUseCase.execute(verifyEmailOtpDto);
    return OtpResponse.from(data, this.metaService.build());
  }

  @Post("verify-link/email")
  @Serialize(OtpResponse)
  async verifyEmailLink(@Body() verifyEmailLinkDto: VerifyEmailLinkDto) {
    const data = await this.verifyEmailLinkUseCase.execute(verifyEmailLinkDto);
    return OtpResponse.from(data, this.metaService.build());
  }
}
