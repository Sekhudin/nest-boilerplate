import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { ContextService } from "src/shared/modules/global/context/context.service";
import { CryptoService } from "src/shared/modules/global/crypto/crypto.service";
import { MagicLinkService } from "src/shared/modules/global/magic-link/magic-link.service";
import { OtpMailerService } from "src/shared/modules/global/mailer/otp-mailer.service";
import { OtpGeneratorService } from "src/shared/modules/global/otp-generator/otp-generator.service";
import { getFreshMailerConfigMock } from "test/mocks/config/mailer.config.mock";
import { getFreshOtpMock } from "test/mocks/entities/otp.entity.mock copy";
import { getFreshUserMock } from "test/mocks/entities/user.entity.mock";
import { getFreshOtpRepositoryMock } from "test/mocks/repositories/otp.repository.mock";
import { getFreshContextServiceMock } from "test/mocks/services/context.service.mock";
import { getFreshCryptoServiceMock } from "test/mocks/services/crypto.service.mock";
import { getFreshMagicLinkServiceMock } from "test/mocks/services/magic-link.service.mock";
import { getFreshOtpGeneratorServiceMock } from "test/mocks/services/otp-generator.service.mock";
import { getFreshOtpMailerServiceMock } from "test/mocks/services/otp-mailer.service.mock";
import { getFreshEntityManagerMock } from "test/mocks/utils/entity-manager.mock";
import { getFreshGeneratedOtpMock } from "test/mocks/utils/generated-otp.mock";
import { getFreshUserAgentMock } from "test/mocks/utils/user-agent.mock";
import { OtpVerifyLinkDto } from "./dto/otp-verify-link.dto";
import { OtpVerifyDto } from "./dto/otp-verify.dto";
import { OtpRepository } from "./otp.repository";
import { OtpService } from "./otp.service";

let mailerConfigMock: ReturnType<typeof getFreshMailerConfigMock>;
jest.mock("src/config/mailer.config", () => ({
  get mailerConfig() {
    return mailerConfigMock;
  },
}));

describe("OtpService", () => {
  let service: OtpService;
  const otpGeneratorServiceMock = getFreshOtpGeneratorServiceMock();
  const magicLinkServiceMock = getFreshMagicLinkServiceMock();
  const otpMailerServiceMock = getFreshOtpMailerServiceMock();
  const cryptoServiceMock = getFreshCryptoServiceMock();
  const contextServiceMock = getFreshContextServiceMock();
  const otpRepositoryMock = getFreshOtpRepositoryMock();

  beforeEach(async () => {
    mailerConfigMock = getFreshMailerConfigMock();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OtpService,
        { provide: OtpGeneratorService, useValue: otpGeneratorServiceMock },
        { provide: MagicLinkService, useValue: magicLinkServiceMock },
        { provide: OtpMailerService, useValue: otpMailerServiceMock },
        { provide: CryptoService, useValue: cryptoServiceMock },
        { provide: ContextService, useValue: contextServiceMock },
        { provide: OtpRepository, useValue: otpRepositoryMock },
      ],
    }).compile();

    service = module.get<OtpService>(OtpService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("sendOtpForLocalSignup", () => {
    const generatedOtpMock = getFreshGeneratedOtpMock();
    const otpMock = getFreshOtpMock();
    const userAgentMock = getFreshUserAgentMock();
    const userMock = getFreshUserMock();
    const magicLinkMock = "fe.com?token=12i2i&purpose=EMAIL_VERIFICATION";

    beforeEach(() => {
      otpGeneratorServiceMock.generateOtp.mockReset();
      otpRepositoryMock.create.mockReset();
      cryptoServiceMock.hashOtp.mockReset();
      otpRepositoryMock.save.mockReset();
      contextServiceMock.getUserAgent.mockReset();
      magicLinkServiceMock.generateEmailVerificationLink.mockReset();
      otpMailerServiceMock.sendEmailVerification.mockReset();
    });

    it("should create and send email verification OTP without EntityManager", async () => {
      otpGeneratorServiceMock.generateOtp.mockReturnValue(generatedOtpMock);
      otpRepositoryMock.create.mockReturnValue(otpMock);
      cryptoServiceMock.hashOtp.mockResolvedValue("hashed:otp123456");
      otpRepositoryMock.save.mockResolvedValue(otpMock);
      contextServiceMock.getUserAgent.mockReturnValue(userAgentMock);
      magicLinkServiceMock.generateEmailVerificationLink.mockReturnValue(magicLinkMock);

      const result = await service.sendOtpForLocalSignup(userMock);

      expect(otpGeneratorServiceMock.generateOtp).toHaveBeenCalled();
      expect(otpRepositoryMock.create).toHaveBeenCalledWith({ user: userMock });
      expect(cryptoServiceMock.hashOtp).toHaveBeenCalledWith(generatedOtpMock.code);
      expect(otpRepositoryMock.save).toHaveBeenCalledWith(otpMock);
      expect(contextServiceMock.getUserAgent).toHaveBeenCalled();
      expect(magicLinkServiceMock.generateEmailVerificationLink).toHaveBeenCalledWith({
        token: otpMock.token,
        purpose: otpMock.purpose,
      });
      expect(otpMailerServiceMock.sendEmailVerification).toHaveBeenCalledWith({
        to: userMock.email,
        code: generatedOtpMock.code,
        magicLink: magicLinkMock,
        expiresInMinutes: generatedOtpMock.expiresInMinutes,
        browser: userAgentMock.browser.name,
        ipAddress: userAgentMock.ip,
        os: userAgentMock.os.name,
      });
      expect(result).toBe(generatedOtpMock);
    });

    it("should create and send email verification OTP with EntityManager", async () => {
      const entityManagerMock = getFreshEntityManagerMock();

      entityManagerMock.getRepository.mockReturnValue(otpRepositoryMock);
      otpGeneratorServiceMock.generateOtp.mockReturnValue(generatedOtpMock);
      otpRepositoryMock.create.mockReturnValue(otpMock);
      cryptoServiceMock.hashOtp.mockResolvedValue("hashed:otp123456");
      otpRepositoryMock.save.mockResolvedValue(otpMock);
      contextServiceMock.getUserAgent.mockReturnValue(userAgentMock);
      magicLinkServiceMock.generateEmailVerificationLink.mockReturnValue(magicLinkMock);

      const result = await service.sendOtpForLocalSignup(userMock, entityManagerMock);

      expect(otpGeneratorServiceMock.generateOtp).toHaveBeenCalled();
      expect(otpRepositoryMock.create).toHaveBeenCalledWith({ user: userMock });
      expect(cryptoServiceMock.hashOtp).toHaveBeenCalledWith(generatedOtpMock.code);
      expect(otpRepositoryMock.save).toHaveBeenCalledWith(otpMock);
      expect(contextServiceMock.getUserAgent).toHaveBeenCalled();
      expect(magicLinkServiceMock.generateEmailVerificationLink).toHaveBeenCalledWith({
        token: otpMock.token,
        purpose: otpMock.purpose,
      });
      expect(otpMailerServiceMock.sendEmailVerification).toHaveBeenCalledWith({
        to: userMock.email,
        code: generatedOtpMock.code,
        magicLink: magicLinkMock,
        expiresInMinutes: generatedOtpMock.expiresInMinutes,
        browser: userAgentMock.browser.name,
        ipAddress: userAgentMock.ip,
        os: userAgentMock.os.name,
      });
      expect(result).toBe(generatedOtpMock);
    });
  });

  describe("verify", () => {
    const otpMock = getFreshOtpMock();
    const otpVerifyDtoMock: OtpVerifyDto = {
      otpCode: "123456",
      token: "otp-token",
      purpose: "EMAIL_VERIFICATION",
    };

    beforeEach(() => {
      otpRepositoryMock.findOneByOrFail.mockReset();
      otpGeneratorServiceMock.isOtpExpired.mockReset();
      cryptoServiceMock.verifyOtp.mockReset();
      otpRepositoryMock.save.mockReset();
    });

    it("should mark OTP as used and return saved OTP if everything is valid", async () => {
      otpRepositoryMock.findOneByOrFail.mockResolvedValue(otpMock);
      otpGeneratorServiceMock.isOtpExpired.mockReturnValue(false);
      cryptoServiceMock.verifyOtp.mockResolvedValue(true);
      otpRepositoryMock.save.mockResolvedValue(otpMock);

      const result = await service.verify(otpVerifyDtoMock);

      expect(otpRepositoryMock.findOneByOrFail).toHaveBeenCalledWith({ token: otpVerifyDtoMock.token, isUsed: false });
      expect(otpGeneratorServiceMock.isOtpExpired).toHaveBeenCalledWith(otpMock.expiresAt);
      expect(cryptoServiceMock.verifyOtp).toHaveBeenCalledWith(otpVerifyDtoMock.otpCode, otpMock.hashOtp);
      expect(otpRepositoryMock.save).toHaveBeenCalledWith(otpMock);
      expect(result).toBe(otpMock);
    });

    it("should throw BadRequestException if token is not found", async () => {
      otpRepositoryMock.findOneByOrFail.mockRejectedValue(new BadRequestException("Invalid token"));

      await expect(service.verify(otpVerifyDtoMock)).rejects.toThrow(new BadRequestException("Invalid token"));
      expect(otpRepositoryMock.findOneByOrFail).toHaveBeenCalledWith({ token: otpVerifyDtoMock.token, isUsed: false });
      expect(otpGeneratorServiceMock.isOtpExpired).not.toHaveBeenCalledWith(otpMock.expiresAt);
      expect(cryptoServiceMock.verifyOtp).not.toHaveBeenCalledWith(otpVerifyDtoMock.otpCode, otpMock.hashOtp);
      expect(otpRepositoryMock.save).not.toHaveBeenCalledWith(otpMock);
    });

    it("should throw BadRequestException if OTP is expired", async () => {
      otpRepositoryMock.findOneByOrFail.mockResolvedValue(otpMock);
      otpGeneratorServiceMock.isOtpExpired.mockReturnValue(true);

      await expect(service.verify(otpVerifyDtoMock)).rejects.toThrow(new BadRequestException("OTP has expired"));
      expect(otpRepositoryMock.findOneByOrFail).toHaveBeenCalledWith({ token: otpVerifyDtoMock.token, isUsed: false });
      expect(otpGeneratorServiceMock.isOtpExpired).toHaveBeenCalledWith(otpMock.expiresAt);
      expect(cryptoServiceMock.verifyOtp).not.toHaveBeenCalledWith(otpVerifyDtoMock.otpCode, otpMock.hashOtp);
      expect(otpRepositoryMock.save).not.toHaveBeenCalledWith(otpMock);
    });

    it("should throw BadRequestException if OTP code is incorrect", async () => {
      otpRepositoryMock.findOneByOrFail.mockResolvedValue(otpMock);
      otpGeneratorServiceMock.isOtpExpired.mockReturnValue(false);
      cryptoServiceMock.verifyOtp.mockResolvedValue(false);

      await expect(service.verify(otpVerifyDtoMock)).rejects.toThrow(new BadRequestException("OTP code is incorrect"));
      expect(otpRepositoryMock.findOneByOrFail).toHaveBeenCalledWith({ token: otpVerifyDtoMock.token, isUsed: false });
      expect(otpGeneratorServiceMock.isOtpExpired).toHaveBeenCalledWith(otpMock.expiresAt);
      expect(cryptoServiceMock.verifyOtp).toHaveBeenCalledWith(otpVerifyDtoMock.otpCode, otpMock.hashOtp);
      expect(otpRepositoryMock.save).not.toHaveBeenCalledWith(otpMock);
    });
  });

  describe("verifyLink", () => {
    const otpMock = getFreshOtpMock();
    const otpVerifyLinkDtoMock: OtpVerifyLinkDto = {
      token: "otp-token",
      purpose: "EMAIL_VERIFICATION",
    };

    beforeEach(() => {
      otpRepositoryMock.findOneByOrFail.mockReset();
      otpGeneratorServiceMock.isOtpExpired.mockReset();
      otpRepositoryMock.save.mockReset();
    });
    it("should mark OTP as used and return saved OTP", async () => {
      otpRepositoryMock.findOneByOrFail.mockResolvedValue(otpMock);
      otpGeneratorServiceMock.isOtpExpired.mockReturnValue(false);
      otpRepositoryMock.save.mockResolvedValue(otpMock);

      const result = await service.verifyLink(otpVerifyLinkDtoMock);

      expect(otpRepositoryMock.findOneByOrFail).toHaveBeenCalledWith({
        token: otpVerifyLinkDtoMock.token,
        isUsed: false,
      });

      expect(otpGeneratorServiceMock.isOtpExpired).toHaveBeenCalledWith(otpMock.expiresAt);
      expect(otpRepositoryMock.save).toHaveBeenCalledWith(otpMock);
      expect(result).toBe(otpMock);
    });

    it("should throw BadRequestException if link is invalid", async () => {
      otpRepositoryMock.findOneByOrFail.mockRejectedValue(new BadRequestException("Invalid link"));

      await expect(service.verifyLink(otpVerifyLinkDtoMock)).rejects.toThrow(new BadRequestException("Invalid link"));

      expect(otpRepositoryMock.findOneByOrFail).toHaveBeenCalledWith({
        token: otpVerifyLinkDtoMock.token,
        isUsed: false,
      });
      expect(otpGeneratorServiceMock.isOtpExpired).not.toHaveBeenCalledWith(otpMock.expiresAt);
      expect(otpRepositoryMock.save).not.toHaveBeenCalledWith(otpMock);
    });

    it("should throw BadRequestException if OTP is expired", async () => {
      otpRepositoryMock.findOneByOrFail.mockResolvedValue(otpMock);
      otpGeneratorServiceMock.isOtpExpired.mockReturnValue(true);

      await expect(service.verifyLink(otpVerifyLinkDtoMock)).rejects.toThrow(
        new BadRequestException("OTP has expired"),
      );

      expect(otpRepositoryMock.findOneByOrFail).toHaveBeenCalledWith({
        token: otpVerifyLinkDtoMock.token,
        isUsed: false,
      });
      expect(otpGeneratorServiceMock.isOtpExpired).toHaveBeenCalledWith(otpMock.expiresAt);
      expect(otpRepositoryMock.save).not.toHaveBeenCalledWith(otpMock);
    });
  });
});
