import { Test, TestingModule } from "@nestjs/testing";
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
import { VerifyLinkDto } from "./dto/requests/verify-link.dto";
import { VerifyOtpDto } from "./dto/requests/verify-otp.dto";
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

  describe("findValidOtpOrThrow", () => {
    const otpMock = getFreshOtpMock();
    const verifyOtpDto: VerifyOtpDto = {
      otpCode: "123456",
      token: "otp-token",
      purpose: "EMAIL_VERIFICATION",
    };

    beforeEach(() => {
      otpRepositoryMock.findOneOrFail.mockReset();
      otpGeneratorServiceMock.isOtpExpired.mockReset();
      cryptoServiceMock.verifyOtp.mockReset();
    });

    it("should return saved OTP if everything is valid", async () => {
      otpRepositoryMock.findOneOrFail.mockResolvedValue(otpMock);
      otpGeneratorServiceMock.isOtpExpired.mockReturnValue(false);
      cryptoServiceMock.verifyOtp.mockResolvedValue(true);

      const result = await service.findValidOtpOrThrow(verifyOtpDto);

      expect(otpRepositoryMock.findOneOrFail).toHaveBeenCalledWith({
        where: { token: verifyOtpDto.token, purpose: verifyOtpDto.purpose, isUsed: false },
        relations: { user: true },
      });
      expect(otpGeneratorServiceMock.isOtpExpired).toHaveBeenCalledWith(otpMock.expiresAt);
      expect(cryptoServiceMock.verifyOtp).toHaveBeenCalledWith(verifyOtpDto.otpCode, otpMock.hashOtp);
      expect(result).toBe(otpMock);
    });

    it("should throw OtpInvalidTokenException if token is not found", async () => {
      otpRepositoryMock.findOneOrFail.mockRejectedValue(new OtpInvalidTokenException());

      await expect(service.findValidOtpOrThrow(verifyOtpDto)).rejects.toThrow(new OtpInvalidTokenException());
      expect(otpRepositoryMock.findOneOrFail).toHaveBeenCalledWith({
        where: { token: verifyOtpDto.token, purpose: verifyOtpDto.purpose, isUsed: false },
        relations: { user: true },
      });
      expect(otpGeneratorServiceMock.isOtpExpired).not.toHaveBeenCalled();
      expect(cryptoServiceMock.verifyOtp).not.toHaveBeenCalled();
    });

    it("should throw OtpExpiredException if OTP is expired", async () => {
      otpRepositoryMock.findOneOrFail.mockResolvedValue(otpMock);
      otpGeneratorServiceMock.isOtpExpired.mockReturnValue(true);

      await expect(service.findValidOtpOrThrow(verifyOtpDto)).rejects.toThrow(new OtpExpiredException());
      expect(otpRepositoryMock.findOneOrFail).toHaveBeenCalledWith({
        where: { token: verifyOtpDto.token, purpose: verifyOtpDto.purpose, isUsed: false },
        relations: { user: true },
      });
      expect(otpGeneratorServiceMock.isOtpExpired).toHaveBeenCalledWith(otpMock.expiresAt);
      expect(cryptoServiceMock.verifyOtp).not.toHaveBeenCalledWith(verifyOtpDto.otpCode, otpMock.hashOtp);
    });

    it("should throw OtpInvalidException if OTP code is incorrect", async () => {
      otpRepositoryMock.findOneOrFail.mockResolvedValue(otpMock);
      otpGeneratorServiceMock.isOtpExpired.mockReturnValue(false);
      cryptoServiceMock.verifyOtp.mockResolvedValue(false);

      await expect(service.findValidOtpOrThrow(verifyOtpDto)).rejects.toThrow(new OtpInvalidException());
      expect(otpRepositoryMock.findOneOrFail).toHaveBeenCalledWith({
        where: { token: verifyOtpDto.token, purpose: verifyOtpDto.purpose, isUsed: false },
        relations: { user: true },
      });
      expect(otpGeneratorServiceMock.isOtpExpired).toHaveBeenCalledWith(otpMock.expiresAt);
      expect(cryptoServiceMock.verifyOtp).toHaveBeenCalledWith(verifyOtpDto.otpCode, otpMock.hashOtp);
    });

    it("should use entityManager if provided", async () => {
      const entityManagerMock = getFreshEntityManagerMock();
      entityManagerMock.getRepository.mockReturnValue(otpRepositoryMock);
      otpRepositoryMock.findOneOrFail.mockResolvedValue(otpMock);
      otpGeneratorServiceMock.isOtpExpired.mockReturnValue(false);
      cryptoServiceMock.verifyOtp.mockResolvedValue(true);

      const result = await service.findValidOtpOrThrow(verifyOtpDto, entityManagerMock);

      expect(otpRepositoryMock.findOneOrFail).toHaveBeenCalledWith({
        where: { token: verifyOtpDto.token, purpose: verifyOtpDto.purpose, isUsed: false },
        relations: { user: true },
      });
      expect(otpGeneratorServiceMock.isOtpExpired).toHaveBeenCalledWith(otpMock.expiresAt);
      expect(cryptoServiceMock.verifyOtp).toHaveBeenCalledWith(verifyOtpDto.otpCode, otpMock.hashOtp);
      expect(result).toBe(otpMock);
    });
  });

  describe("findValidLinkOrThrow", () => {
    const otpMock = getFreshOtpMock();
    const otpVerifyLinkDtoMock: VerifyLinkDto = {
      token: "otp-token",
      purpose: "EMAIL_VERIFICATION",
    };

    beforeEach(() => {
      otpRepositoryMock.findOneOrFail.mockReset();
      otpGeneratorServiceMock.isOtpExpired.mockReset();
    });
    it("should return saved OTP if everithing is valid", async () => {
      otpRepositoryMock.findOneOrFail.mockResolvedValue(otpMock);
      otpGeneratorServiceMock.isOtpExpired.mockReturnValue(false);

      const result = await service.findValidLinkOrThrow(otpVerifyLinkDtoMock);

      expect(otpRepositoryMock.findOneOrFail).toHaveBeenCalledWith({
        where: { token: otpVerifyLinkDtoMock.token, purpose: otpVerifyLinkDtoMock.purpose, isUsed: false },
        relations: { user: true },
      });

      expect(otpGeneratorServiceMock.isOtpExpired).toHaveBeenCalledWith(otpMock.expiresAt);
      expect(result).toBe(otpMock);
    });

    it("should throw OtpMagicLinkInvalidException if link is invalid", async () => {
      otpRepositoryMock.findOneOrFail.mockRejectedValue(new OtpMagicLinkInvalidException());

      await expect(service.findValidLinkOrThrow(otpVerifyLinkDtoMock)).rejects.toThrow(
        new OtpMagicLinkInvalidException(),
      );

      expect(otpRepositoryMock.findOneOrFail).toHaveBeenCalledWith({
        where: { token: otpVerifyLinkDtoMock.token, purpose: otpVerifyLinkDtoMock.purpose, isUsed: false },
        relations: { user: true },
      });
      expect(otpGeneratorServiceMock.isOtpExpired).not.toHaveBeenCalledWith(otpMock.expiresAt);
    });

    it("should throw OtpMagicLinkExpiredException if magic-link is expired", async () => {
      otpRepositoryMock.findOneOrFail.mockResolvedValue(otpMock);
      otpGeneratorServiceMock.isOtpExpired.mockReturnValue(true);

      await expect(service.findValidLinkOrThrow(otpVerifyLinkDtoMock)).rejects.toThrow(
        new OtpMagicLinkExpiredException(),
      );

      expect(otpRepositoryMock.findOneOrFail).toHaveBeenCalledWith({
        where: { token: otpVerifyLinkDtoMock.token, purpose: otpVerifyLinkDtoMock.purpose, isUsed: false },
        relations: { user: true },
      });
      expect(otpGeneratorServiceMock.isOtpExpired).toHaveBeenCalledWith(otpMock.expiresAt);
    });

    it("should use entityManager if provided", async () => {
      const entityManagerMock = getFreshEntityManagerMock();
      entityManagerMock.getRepository.mockReturnValue(otpRepositoryMock);
      otpRepositoryMock.findOneOrFail.mockResolvedValue(otpMock);
      otpGeneratorServiceMock.isOtpExpired.mockReturnValue(false);

      const result = await service.findValidLinkOrThrow(otpVerifyLinkDtoMock, entityManagerMock);

      expect(otpRepositoryMock.findOneOrFail).toHaveBeenCalledWith({
        where: { token: otpVerifyLinkDtoMock.token, purpose: otpVerifyLinkDtoMock.purpose, isUsed: false },
        relations: { user: true },
      });
      expect(otpGeneratorServiceMock.isOtpExpired).toHaveBeenCalledWith(otpMock.expiresAt);
      expect(result).toBe(otpMock);
    });
  });

  describe("markOtpIsUsed", () => {
    const otpMock = getFreshOtpMock();

    beforeEach(() => {
      otpRepositoryMock.save.mockReset();
    });

    it("should return otp with isUsed status true", async () => {
      otpRepositoryMock.save.mockResolvedValue(otpMock);

      const result = await service.markOtpIsUsed(otpMock);

      expect(otpRepositoryMock.save).toHaveBeenCalledWith(otpMock);
      expect(result.isUsed).toBe(true);
    });

    it("should use entityManager if provided", async () => {
      const entityManagerMock = getFreshEntityManagerMock();
      entityManagerMock.getRepository.mockReturnValue(otpRepositoryMock);
      otpRepositoryMock.save.mockResolvedValue(otpMock);

      const result = await service.markOtpIsUsed(otpMock, entityManagerMock);
      expect(otpRepositoryMock.save).toHaveBeenCalledWith(otpMock);
      expect(result.isUsed).toBe(true);
    });
  });
});
