import { mock } from "jest-mock-extended";
import { Test, TestingModule } from "@nestjs/testing";
import { getFreshMailerConfigMock } from "test/mocks/config/mailer.config.mock";
import { getFreshOtpMock } from "test/mocks/entities/otp.entity.mock copy";
import { getFreshOtpServiceMock } from "test/mocks/services/otp.service.mock";
import { VerifyEmailLinkDto } from "./dto/requests/verify-email-link.dto";
import { VerifyEmailOtpDto } from "./dto/requests/verify-email-otp.dto";
import { OtpController } from "./otp.controller";
import { OtpService } from "./otp.service";
import { VerifyEmailLinkUseCase } from "./use-cases/verify-email-link.use-case";
import { VerifyEmailOtpUseCase } from "./use-cases/verify-email-otp.use-case";

let mailerConfigMock: ReturnType<typeof getFreshMailerConfigMock>;
jest.mock("src/config/mailer.config", () => ({
  get mailerConfig() {
    return mailerConfigMock;
  },
}));

describe("OtpController", () => {
  let controller: OtpController;
  const verifyEmailOtpUseCaseMock = mock<VerifyEmailOtpUseCase>();
  const verifyEmailLinkUseCaseMock = mock<VerifyEmailLinkUseCase>();

  beforeEach(async () => {
    mailerConfigMock = getFreshMailerConfigMock();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OtpController],
      providers: [
        { provide: VerifyEmailOtpUseCase, useValue: verifyEmailOtpUseCaseMock },
        { provide: VerifyEmailLinkUseCase, useValue: verifyEmailLinkUseCaseMock },
      ],
    }).compile();

    controller = module.get<OtpController>(OtpController);
  });

  it("should be defined", () => {
    expect(true).toBeDefined();
  });

  describe("verify/email", () => {
    const otpMock = getFreshOtpMock();
    const verifyEmailOtpDtoMock: VerifyEmailOtpDto = {
      otpCode: "123456",
      token: "token-otp",
      purpose: "EMAIL_VERIFICATION",
    };

    beforeEach(() => {
      verifyEmailOtpUseCaseMock.execute.mockReset();
    });

    it("should call VerifyEmailOtpUseCase with dto and return result", async () => {
      verifyEmailOtpUseCaseMock.execute.mockResolvedValue(otpMock);

      const result = await controller.verifyEmailOtp(verifyEmailOtpDtoMock);

      expect(verifyEmailOtpUseCaseMock.execute).toHaveBeenCalledWith(verifyEmailOtpDtoMock);
      expect(result).toBe(otpMock);
    });
  });

  describe("verify-link/email", () => {
    const otpMock = getFreshOtpMock();
    const otpVerifyEmailLinkDtoMock: VerifyEmailLinkDto = {
      token: "otp-token",
      purpose: "EMAIL_VERIFICATION",
    };

    beforeEach(() => {
      verifyEmailLinkUseCaseMock.execute.mockReset();
    });

    it("should call otpService.verifyLink with dto and return result", async () => {
      verifyEmailLinkUseCaseMock.execute.mockResolvedValue(otpMock);

      const result = await controller.verifyEmailLink(otpVerifyEmailLinkDtoMock);

      expect(verifyEmailLinkUseCaseMock.execute).toHaveBeenCalledWith(otpVerifyEmailLinkDtoMock);
      expect(result).toBe(otpMock);
    });
  });
});
