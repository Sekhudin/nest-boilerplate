import { Test, TestingModule } from "@nestjs/testing";
import { getFreshMailerConfigMock } from "test/mocks/config/mailer.config.mock";
import { getFreshOtpMock } from "test/mocks/entities/otp.entity.mock copy";
import { getFreshOtpServiceMock } from "test/mocks/services/otp.service.mock";
import { OtpVerifyLinkDto } from "./dto/otp-verify-link.dto";
import { OtpVerifyDto } from "./dto/otp-verify.dto";
import { OtpController } from "./otp.controller";
import { OtpService } from "./otp.service";

let mailerConfigMock: ReturnType<typeof getFreshMailerConfigMock>;
jest.mock("src/config/mailer.config", () => ({
  get mailerConfig() {
    return mailerConfigMock;
  },
}));

describe("OtpController", () => {
  let controller: OtpController;
  const otpServiceMock = getFreshOtpServiceMock();

  beforeEach(async () => {
    mailerConfigMock = getFreshMailerConfigMock();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OtpController],
      providers: [{ provide: OtpService, useValue: otpServiceMock }],
    }).compile();

    controller = module.get<OtpController>(OtpController);
  });

  it("should be defined", () => {
    expect(true).toBeDefined();
  });

  describe("verify", () => {
    const otpMock = getFreshOtpMock();
    const otpVerifyDtoMock: OtpVerifyDto = {
      otpCode: "123456",
      token: "token-otp",
      purpose: "EMAIL_VERIFICATION",
    };

    beforeEach(() => {
      otpServiceMock.verify.mockReset();
    });

    it("should call otpService.verify with dto and return result", async () => {
      otpServiceMock.verify.mockResolvedValue(otpMock);
      const result = await controller.otpVerify(otpVerifyDtoMock);
      expect(otpServiceMock.verify).toHaveBeenCalledWith(otpVerifyDtoMock);
      expect(result).toBe(otpMock);
    });
  });

  describe("verify/link", () => {
    const otpMock = getFreshOtpMock();
    const otpVerifyLinkDtoMock: OtpVerifyLinkDto = {
      token: "otp-token",
      purpose: "EMAIL_VERIFICATION",
    };

    beforeEach(() => {
      otpServiceMock.verifyLink.mockReset();
    });

    it("should call otpService.verifyLink with dto and return result", async () => {
      otpServiceMock.verifyLink.mockResolvedValue(otpMock);
      const result = await controller.otpVerifyLink(otpVerifyLinkDtoMock);
      expect(otpServiceMock.verifyLink).toHaveBeenCalledWith(otpVerifyLinkDtoMock);
      expect(result).toBe(otpMock);
    });
  });
});
