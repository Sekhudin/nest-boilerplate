import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/shared/base/base.use-case";
import { VerifyEmailOtpDto } from "src/modules/otp/dto/requests/verify-email-otp.dto";
import { Otp } from "src/modules/otp/entities/otp.entity";
import { OtpService } from "src/modules/otp/otp.service";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class VerifyEmailOtpUseCase implements BaseUseCase<VerifyEmailOtpDto, Otp> {
  constructor(
    private readonly userService: UserService,
    private readonly otpService: OtpService,
    private readonly dataSource: DataSource,
  ) {}

  execute(inputDto: VerifyEmailOtpDto): Promise<Otp> {
    return this.dataSource.transaction(async (entityManager) => {
      const otp = await this.otpService.findValidOtpOrThrow(inputDto, entityManager);
      await this.userService.markEmailIsVerified(otp.user, entityManager);
      return await this.otpService.markOtpIsUsed(otp, entityManager);
    });
  }
}
