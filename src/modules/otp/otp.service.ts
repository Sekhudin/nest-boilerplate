import { EntityManager } from "typeorm";
import { Injectable } from "@nestjs/common";
import { User } from "src/modules/user/entities/user.entity";
import { ContextService } from "src/shared/modules/global/context/context.service";
import { CryptoService } from "src/shared/modules/global/crypto/crypto.service";
import { OtpMailerService, SendEmailVerificationContext } from "src/shared/modules/global/mailer/otp-mailer.service";
import { OtpGeneratorService } from "src/shared/modules/global/otp-generator/otp-generator.service";
import { BaseService } from "src/shared/base/base.service";
import { Otp } from "./entities/otp.entity";
import { OtpRepository } from "./otp.repository";

@Injectable()
export class OtpService extends BaseService {
  constructor(
    private readonly otpGeneratorService: OtpGeneratorService,
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
    const hashOtp = await this.cryptoService.hashOtp(generatedOtp.code);
    const otp = repository.create({ user });
    otp.hashOtp = hashOtp;
    otp.purpose = "EMAIL_VERIFICATION";
    otp.expiresAt = generatedOtp.expiresAt;

    const userAgent = this.contextService.getUserAgent();
    const sendEmailVerificationContext: SendEmailVerificationContext = {
      to: user.email,
      code: generatedOtp.code,
      magicLink: generatedOtp.magicLink,
      expiresInMinutes: generatedOtp.expiresInMinutes,
      browser: userAgent.browser.name,
      ipAddress: userAgent.ip,
      os: userAgent.os.name,
    };
    await this.otpMailerService.sendEmailVerification(sendEmailVerificationContext);
    return await repository.save(otp);
  }
}
