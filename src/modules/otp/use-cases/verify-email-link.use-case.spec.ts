import { DataSource } from "typeorm";
import { Test } from "@nestjs/testing";
import { VerifyEmailLinkDto } from "src/modules/otp/dto/requests/verify-email-link.dto";
import { OtpService } from "src/modules/otp/otp.service";
import { UserService } from "src/modules/user/user.service";
import { getFreshMailerConfigMock } from "test/mocks/config/mailer.config.mock";
import { getFreshOtpMock } from "test/mocks/entities/otp.entity.mock copy";
import { getFreshOtpServiceMock } from "test/mocks/services/otp.service.mock";
import { getFreshUserServiceMock } from "test/mocks/services/user.service.mock";
import { getFreshDataSourceMock } from "test/mocks/utils/datasource.mock";
import { VerifyEmailLinkUseCase } from "./verify-email-link.use-case";

let mailerConfigMock: ReturnType<typeof getFreshMailerConfigMock>;
jest.mock("src/config/mailer.config", () => ({
  get mailerConfig() {
    return mailerConfigMock;
  },
}));

describe("VerifyEmailLinkUseCase", () => {
  let useCase: VerifyEmailLinkUseCase;
  const otpserviceMock = getFreshOtpServiceMock();
  const userServiceMock = getFreshUserServiceMock();
  const dataSourceMock = getFreshDataSourceMock();

  beforeEach(async () => {
    mailerConfigMock = getFreshMailerConfigMock();
    const module = await Test.createTestingModule({
      providers: [
        VerifyEmailLinkUseCase,
        { provide: OtpService, useValue: otpserviceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: DataSource, useValue: dataSourceMock },
      ],
    }).compile();

    useCase = module.get<VerifyEmailLinkUseCase>(VerifyEmailLinkUseCase);
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
  });

  describe("execute", () => {
    const verifyEmailLinkDtoMock: VerifyEmailLinkDto = {
      token: "otp-token",
      purpose: "EMAIL_VERIFICATION",
    };
    const otpMock = getFreshOtpMock();
    const entityManagerMock = dataSourceMock.createEntityManager();

    beforeEach(() => {
      otpserviceMock.findValidLinkOrThrow.mockReset();
      otpserviceMock.markOtpIsUsed.mockReset();
    });

    it("should verify magic link and return otp object", async () => {
      otpserviceMock.findValidLinkOrThrow.mockResolvedValue(otpMock);
      otpserviceMock.markOtpIsUsed.mockResolvedValue(otpMock);

      const result = await useCase.execute(verifyEmailLinkDtoMock);

      expect(otpserviceMock.findValidLinkOrThrow).toHaveBeenCalledWith(verifyEmailLinkDtoMock, entityManagerMock);
      expect(userServiceMock.markEmailIsVerified).toHaveBeenCalledWith(otpMock.user, entityManagerMock);
      expect(otpserviceMock.markOtpIsUsed).toHaveBeenCalledWith(otpMock, entityManagerMock);
      expect(result).toBe(otpMock);
    });
  });
});
