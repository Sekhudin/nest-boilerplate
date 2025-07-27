import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthHistoryModule } from "src/modules/auth-history/auth-history.module";
import { UserModule } from "src/modules/user/user.module";
import { Otp } from "./entities/otp.entity";
import { OtpController } from "./otp.controller";
import { OtpRepository } from "./otp.repository";
import { OtpService } from "./otp.service";
import { VerifyEmailLinkUseCase } from "./use-cases/verify-email-link.use-case";
import { VerifyEmailOtpUseCase } from "./use-cases/verify-email-otp.use-case";

@Module({
  imports: [TypeOrmModule.forFeature([Otp]), UserModule, AuthHistoryModule],
  controllers: [OtpController],
  providers: [OtpService, OtpRepository, VerifyEmailOtpUseCase, VerifyEmailLinkUseCase],
  exports: [OtpService],
})
export class OtpModule {}
