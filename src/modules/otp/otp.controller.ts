import { Body, Controller, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiExtraModels } from "@nestjs/swagger";
import { MetaService } from "src/shared/modules/global/meta/meta.service";
import { VerifyEmailLinkDto } from "./dto/requests/verify-email-link.dto";
import { VerifyEmailOtpDto } from "./dto/requests/verify-email-otp.dto";
import { OtpResponse } from "./dto/responses/otp.response";
import { VerifyEmailLinkUseCase } from "./use-cases/verify-email-link.use-case";
import { VerifyEmailOtpUseCase } from "./use-cases/verify-email-otp.use-case";

@Controller("otp")
@ApiExtraModels(OtpResponse)
export class OtpController {
  constructor(
    private readonly verifyEmailOtpUseCase: VerifyEmailOtpUseCase,
    private readonly verifyEmailLinkUseCase: VerifyEmailLinkUseCase,
    private readonly metaService: MetaService,
  ) {}

  @Post("verify/email")
  @ApiCreatedResponse({ type: OtpResponse })
  async verifyEmailOtp(@Body() verifyEmailOtpDto: VerifyEmailOtpDto) {
    const data = await this.verifyEmailOtpUseCase.execute(verifyEmailOtpDto);
    return OtpResponse.from(data, this.metaService.build());
  }

  @Post("verify-link/email")
  @ApiCreatedResponse({ type: OtpResponse })
  async verifyEmailLink(@Body() verifyEmailLinkDto: VerifyEmailLinkDto) {
    const data = await this.verifyEmailLinkUseCase.execute(verifyEmailLinkDto);
    return OtpResponse.from(data, this.metaService.build());
  }
}
