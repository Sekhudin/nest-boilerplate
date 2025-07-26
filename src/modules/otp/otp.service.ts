import { EntityManager } from "typeorm";
import { SendEmailVerificationContext } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { BaseService } from "src/shared/base/base.service";
import { ContextService } from "src/shared/modules/global/context/context.service";
import { CryptoService } from "src/shared/modules/global/crypto/crypto.service";
import { MagicLinkService } from "src/shared/modules/global/magic-link/magic-link.service";
import { OtpMailerService } from "src/shared/modules/global/mailer/otp-mailer.service";
import { OtpGeneratorService } from "src/shared/modules/global/otp-generator/otp-generator.service";
import { OtpExpiredException } from "src/shared/exceptions/otp/otp-expired.exception";
import { OtpInvalidTokenException } from "src/shared/exceptions/otp/otp-invalid-token.exception";
import { OtpInvalidException } from "src/shared/exceptions/otp/otp-invalid.exception";
import { OtpMagicLinkExpiredException } from "src/shared/exceptions/otp/otp-magic-link-expired.exception";
import { OtpMagicLinkInvalidException } from "src/shared/exceptions/otp/otp-magic-link-invalid.exception";
import { User } from "src/modules/user/entities/user.entity";
import { Otp } from "./entities/otp.entity";
import { VerifyLinkDto } from "./dto/requests/verify-link.dto";
import { VerifyOtpDto } from "./dto/requests/verify-otp.dto";
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
    return otp;
  }

  async findValidOtpOrThrow(verifyOtpDto: VerifyOtpDto, entityManager?: EntityManager) {
    const repository = this.getRepository(Otp, this.otpRepository, entityManager);
    const foundOtp = await repository
      .findOneOrFail({
        where: { token: verifyOtpDto.token, purpose: verifyOtpDto.purpose, isUsed: false },
        relations: { user: true },
      })
      .catch(() => {
        throw new OtpInvalidTokenException();
      });

    if (this.otpGeneratorService.isOtpExpired(foundOtp.expiresAt)) {
      throw new OtpExpiredException();
    }

    const isValidOtp = await this.cryptoService.verifyOtp(verifyOtpDto.otpCode, foundOtp.hashOtp);
    if (!isValidOtp) throw new OtpInvalidException();
    return foundOtp;
  }

  async findValidLinkOrThrow(verifyLinkDto: VerifyLinkDto, entityManager?: EntityManager) {
    const repository = this.getRepository(Otp, this.otpRepository, entityManager);
    const foundLink = await repository
      .findOneOrFail({
        where: { token: verifyLinkDto.token, purpose: verifyLinkDto.purpose, isUsed: false },
        relations: { user: true },
      })
      .catch(() => {
        throw new OtpMagicLinkInvalidException();
      });

    if (this.otpGeneratorService.isOtpExpired(foundLink.expiresAt)) {
      throw new OtpMagicLinkExpiredException();
    }
    return foundLink;
  }

  markOtpIsUsed(otp: Otp, entityManager?: EntityManager) {
    const repository = this.getRepository(Otp, this.otpRepository, entityManager);
    otp.isUsed = true;
    return repository.save(otp);
  }
}
