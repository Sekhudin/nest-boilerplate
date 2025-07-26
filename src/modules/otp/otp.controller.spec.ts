import { mock } from "jest-mock-extended";
import { Test, TestingModule } from "@nestjs/testing";
import { MetaService } from "src/shared/modules/global/meta/meta.service";
import { getFreshMailerConfigMock } from "test/mocks/config/mailer.config.mock";
import { getFreshOtpMock } from "test/mocks/entities/otp.entity.mock copy";
import { getFreshMetaServiceMock } from "test/mocks/services/meta.service.mock";
import { getFreshMetadataMock } from "test/mocks/utils/metadata.mock";
import { VerifyEmailLinkDto } from "./dto/requests/verify-email-link.dto";
import { VerifyEmailOtpDto } from "./dto/requests/verify-email-otp.dto";
import { OtpResponse } from "./dto/responses/otp.response";
import { OtpController } from "./otp.controller";
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
  const metaServiceMock = getFreshMetaServiceMock();
  const otpSingleResponseSpy = jest.spyOn(OtpResponse, "from");

  beforeEach(async () => {
    mailerConfigMock = getFreshMailerConfigMock();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OtpController],
      providers: [
        { provide: VerifyEmailOtpUseCase, useValue: verifyEmailOtpUseCaseMock },
        { provide: VerifyEmailLinkUseCase, useValue: verifyEmailLinkUseCaseMock },
        { provide: MetaService, useValue: metaServiceMock },
      ],
    }).compile();

    controller = module.get<OtpController>(OtpController);
  });

  it("should be defined", () => {
    expect(true).toBeDefined();
  });

  describe("verify/email", () => {
    const otpMock = getFreshOtpMock();
    const metadataMock = getFreshMetadataMock();
    const resultMock = mock<OtpResponse>();
    const verifyEmailOtpDtoMock: VerifyEmailOtpDto = {
      otpCode: "123456",
      token: "token-otp",
      purpose: "EMAIL_VERIFICATION",
    };

    beforeEach(() => {
      verifyEmailOtpUseCaseMock.execute.mockReset();
      metaServiceMock.build.mockReset();
      otpSingleResponseSpy.mockReset();
    });

    it("should call VerifyEmailOtpUseCase with dto and return result", async () => {
      verifyEmailOtpUseCaseMock.execute.mockResolvedValue(otpMock);
      metaServiceMock.build.mockReturnValue(metadataMock);
      otpSingleResponseSpy.mockReturnValue(resultMock);

      const result = await controller.verifyEmailOtp(verifyEmailOtpDtoMock);

      expect(verifyEmailOtpUseCaseMock.execute).toHaveBeenCalledWith(verifyEmailOtpDtoMock);
      expect(otpSingleResponseSpy).toHaveBeenCalledWith(otpMock, metadataMock);
      expect(result).toBe(resultMock);
    });
  });

  describe("verify-link/email", () => {
    const otpMock = getFreshOtpMock();
    const metadataMock = getFreshMetadataMock();
    const resultMock = mock<OtpResponse>();
    const otpVerifyEmailLinkDtoMock: VerifyEmailLinkDto = {
      token: "otp-token",
      purpose: "EMAIL_VERIFICATION",
    };

    beforeEach(() => {
      verifyEmailLinkUseCaseMock.execute.mockReset();
      otpSingleResponseSpy.mockReset();
    });

    it("should call otpService.verifyLink with dto and return result", async () => {
      verifyEmailLinkUseCaseMock.execute.mockResolvedValue(otpMock);
      metaServiceMock.build.mockReturnValue(metadataMock);
      otpSingleResponseSpy.mockReturnValue(resultMock);

      const result = await controller.verifyEmailLink(otpVerifyEmailLinkDtoMock);

      expect(verifyEmailLinkUseCaseMock.execute).toHaveBeenCalledWith(otpVerifyEmailLinkDtoMock);
      expect(otpSingleResponseSpy).toHaveBeenCalledWith(otpMock, metadataMock);
      expect(result).toBe(resultMock);
    });
  });
});
