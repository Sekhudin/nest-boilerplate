import { EntityManager } from "typeorm";
import { SendEmailVerificationContext } from "@nestjs-modules/mailer";
import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseService } from "src/shared/base/base.service";
import { ContextService } from "src/shared/modules/global/context/context.service";
import { CryptoService } from "src/shared/modules/global/crypto/crypto.service";
import { MagicLinkService } from "src/shared/modules/global/magic-link/magic-link.service";
import { OtpMailerService } from "src/shared/modules/global/mailer/otp-mailer.service";
import { OtpGeneratorService } from "src/shared/modules/global/otp-generator/otp-generator.service";
import { User } from "src/modules/user/entities/user.entity";
import { Otp } from "./entities/otp.entity";
import { OtpVerifyLinkDto } from "./dto/otp-verify-link.dto";
import { OtpVerifyDto } from "./dto/otp-verify.dto";
import { OtpRepository } from "./otp.repository";

@Injectable()
export class OtpService extends BaseService {
  constructor(
    private readonly otpGeneratorService: OtpGeneratorService,
    private readonly magicLinkService: MagicLinkService,
    private readonly otpMailerService: OtpMailerService,
    private readonly cryptoService: CryptoService,
    private readonly contextService: ContextService,
    private readonly otpRepository: OtpRepository,
  ) {
    super();
  }

  async sendOtpForLocalSignup(user: User, entityManager?: EntityManager) {
    const repository = this.getRepository(Otp, this.otpRepository, entityManager);
    const generatedOtp = this.otpGeneratorService.generateOtp();

    const newOtp = repository.create({ user });
    newOtp.hashOtp = await this.cryptoService.hashOtp(generatedOtp.code);
    newOtp.purpose = "EMAIL_VERIFICATION";
    newOtp.expiresAt = generatedOtp.expiresAt;

    const otp = await repository.save(newOtp);
    const userAgent = this.contextService.getUserAgent();
    const magicLink = this.magicLinkService.generateEmailVerificationLink({ token: otp.token, purpose: otp.purpose });

    const sendEmailVerificationContext: SendEmailVerificationContext = {
      to: user.email,
      code: generatedOtp.code,
      magicLink,
      expiresInMinutes: generatedOtp.expiresInMinutes,
      browser: userAgent.browser.name,
      ipAddress: userAgent.ip,
      os: userAgent.os.name,
    };

    await this.otpMailerService.sendEmailVerification(sendEmailVerificationContext);
    return generatedOtp;
  }

  async verify(otpVerifyDto: OtpVerifyDto) {
    const foundOtp = await this.otpRepository
      .findOneByOrFail({ token: otpVerifyDto.token, isUsed: false })
      .catch(() => {
        throw new BadRequestException("Invalid token");
      });

    if (this.otpGeneratorService.isOtpExpired(foundOtp.expiresAt)) {
      throw new BadRequestException("OTP has expired");
    }

    const isValidOtp = await this.cryptoService.verifyOtp(otpVerifyDto.otpCode, foundOtp.hashOtp);
    if (!isValidOtp) throw new BadRequestException("OTP code is incorrect");

    foundOtp.isUsed = true;
    return await this.otpRepository.save(foundOtp);
  }

  async verifyLink(otpVerifyLinkDto: OtpVerifyLinkDto) {
    const foundOtp = await this.otpRepository
      .findOneByOrFail({ token: otpVerifyLinkDto.token, isUsed: false })
      .catch(() => {
        throw new BadRequestException("Invalid link");
      });

    if (this.otpGeneratorService.isOtpExpired(foundOtp.expiresAt)) {
      throw new BadRequestException("OTP has expired");
    }

    foundOtp.isUsed = true;
    return await this.otpRepository.save(foundOtp);
  }
}
