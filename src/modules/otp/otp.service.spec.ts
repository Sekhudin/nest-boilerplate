import { Test, TestingModule } from "@nestjs/testing";
import { ContextService } from "src/shared/modules/global/context/context.service";
import { CryptoService } from "src/shared/modules/global/crypto/crypto.service";
import { MagicLinkService } from "src/shared/modules/global/magic-link/magic-link.service";
import { OtpMailerService } from "src/shared/modules/global/mailer/otp-mailer.service";
import { OtpGeneratorService } from "src/shared/modules/global/otp-generator/otp-generator.service";
import { getFreshMailerConfigMock } from "test/mocks/config/mailer.config.mock";
import { getFreshOtpRepositoryMock } from "test/mocks/repositories/otp.repository.mock";
import { getFreshContextServiceMock } from "test/mocks/services/context.service.mock";
import { getFreshCryptoServiceMock } from "test/mocks/services/crypto.service.mock";
import { getFreshMagicLinkServiceMock } from "test/mocks/services/magic-link.service.mock";
import { getFreshOtpGeneratorServiceMock } from "test/mocks/services/otp-generator.service.mock";
import { getFreshOtpMailerServiceMock } from "test/mocks/services/otp-mailer.service.mock";
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

  describe("sendOtpForLocalSignup", () => {});
});
