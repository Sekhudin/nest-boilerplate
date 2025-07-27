import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/shared/base/base.use-case";
import { AuthHistoryService } from "src/modules/auth-history/auth-history.service";
import { VerifyEmailLinkDto } from "src/modules/otp/dto/requests/verify-email-link.dto";
import { Otp } from "src/modules/otp/entities/otp.entity";
import { OtpService } from "src/modules/otp/otp.service";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class VerifyEmailLinkUseCase implements BaseUseCase<VerifyEmailLinkDto, Otp> {
  constructor(
    private readonly otpService: OtpService,
    private readonly userService: UserService,
    private readonly authHistoryService: AuthHistoryService,
    private readonly dataSource: DataSource,
  ) {}

  execute(inputDto: VerifyEmailLinkDto): Promise<Otp> {
    return this.dataSource.transaction(async (entityManager) => {
      const otp = await this.otpService.findValidLinkOrThrow(inputDto, entityManager);
      const user = await this.userService.markEmailIsVerified(otp.user, entityManager);
      const usedOtp = await this.otpService.markOtpIsUsed(otp, entityManager);
      await this.authHistoryService.recordSignUp(user, entityManager);
      return usedOtp;
    });
  }
}
