import { DataSource } from "typeorm";
import { Test } from "@nestjs/testing";
import { AuthHistoryService } from "src/modules/auth-history/auth-history.service";
import { VerifyEmailLinkDto } from "src/modules/otp/dto/requests/verify-email-link.dto";
import { OtpService } from "src/modules/otp/otp.service";
import { UserService } from "src/modules/user/user.service";
import { getFreshMailerConfigMock } from "test/mocks/config/mailer.config.mock";
import { getFreshAuthHistoryMock } from "test/mocks/entities/auth-history.entity.mock";
import { getFreshOtpMock } from "test/mocks/entities/otp.entity.mock copy";
import { getFreshUserMock } from "test/mocks/entities/user.entity.mock";
import { getFreshAuthHistoryServiceMock } from "test/mocks/services/auth-history.service.mock";
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
  const authHistoryServiceMock = getFreshAuthHistoryServiceMock();
  const dataSourceMock = getFreshDataSourceMock();

  beforeEach(async () => {
    mailerConfigMock = getFreshMailerConfigMock();
    const module = await Test.createTestingModule({
      providers: [
        VerifyEmailLinkUseCase,
        { provide: OtpService, useValue: otpserviceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: AuthHistoryService, useValue: authHistoryServiceMock },
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
    const userMock = getFreshUserMock();
    const authHistoryMock = getFreshAuthHistoryMock();
    const entityManagerMock = dataSourceMock.createEntityManager();

    beforeEach(() => {
      otpserviceMock.findValidLinkOrThrow.mockReset();
      userServiceMock.markEmailIsVerified.mockReset();
      otpserviceMock.markOtpIsUsed.mockReset();
      authHistoryServiceMock.recordSignUp.mockReset();
    });

    it("should verify magic link and return otp object", async () => {
      otpserviceMock.findValidLinkOrThrow.mockResolvedValue(otpMock);
      userServiceMock.markEmailIsVerified.mockResolvedValue(userMock);
      otpserviceMock.markOtpIsUsed.mockResolvedValue(otpMock);
      authHistoryServiceMock.recordSignUp.mockResolvedValue(authHistoryMock);

      const result = await useCase.execute(verifyEmailLinkDtoMock);

      expect(otpserviceMock.findValidLinkOrThrow).toHaveBeenCalledWith(verifyEmailLinkDtoMock, entityManagerMock);
      expect(userServiceMock.markEmailIsVerified).toHaveBeenCalledWith(otpMock.user, entityManagerMock);
      expect(otpserviceMock.markOtpIsUsed).toHaveBeenCalledWith(otpMock, entityManagerMock);
      expect(authHistoryServiceMock.recordSignUp).toHaveBeenCalledWith(userMock, entityManagerMock);
      expect(result).toBe(otpMock);
    });
  });
});
