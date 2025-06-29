import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Otp } from "./entities/otp.entity";
import { OtpController } from "./otp.controller";
import { OtpRepository } from "./otp.repository";
import { OtpService } from "./otp.service";

@Module({
  imports: [TypeOrmModule.forFeature([Otp])],
  controllers: [OtpController],
  providers: [OtpService, OtpRepository],
  exports: [OtpService],
})
export class OtpModule {}
