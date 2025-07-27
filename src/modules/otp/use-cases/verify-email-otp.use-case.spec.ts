import { DataSource } from "typeorm";
import { Test } from "@nestjs/testing";
import { AuthHistoryService } from "src/modules/auth-history/auth-history.service";
import { VerifyEmailOtpDto } from "src/modules/otp/dto/requests/verify-email-otp.dto";
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
import { VerifyEmailOtpUseCase } from "./verify-email-otp.use-case";

let mailerConfigMock: ReturnType<typeof getFreshMailerConfigMock>;
jest.mock("src/config/mailer.config", () => ({
  get mailerConfig() {
    return mailerConfigMock;
  },
}));

describe("VerifyEmailOtpUseCase", () => {
  let useCase: VerifyEmailOtpUseCase;
  const otpserviceMock = getFreshOtpServiceMock();
  const userServiceMock = getFreshUserServiceMock();
  const authHistoryServiceMock = getFreshAuthHistoryServiceMock();
  const dataSourceMock = getFreshDataSourceMock();

  beforeEach(async () => {
    mailerConfigMock = getFreshMailerConfigMock();
    const module = await Test.createTestingModule({
      providers: [
        VerifyEmailOtpUseCase,
        { provide: OtpService, useValue: otpserviceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: AuthHistoryService, useValue: authHistoryServiceMock },
        { provide: DataSource, useValue: dataSourceMock },
      ],
    }).compile();

    useCase = module.get<VerifyEmailOtpUseCase>(VerifyEmailOtpUseCase);
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
  });

  describe("execute", () => {
    const verifyEmailOtpDtoMock: VerifyEmailOtpDto = {
      token: "otp-token",
      otpCode: "123456",
      purpose: "EMAIL_VERIFICATION",
    };
    const otpMock = getFreshOtpMock();
    const userMock = getFreshUserMock();
    const authHistoryMock = getFreshAuthHistoryMock();
    const entityManagerMock = dataSourceMock.createEntityManager();

    beforeEach(() => {
      otpserviceMock.findValidOtpOrThrow.mockReset();
      userServiceMock.markEmailIsVerified.mockReset();
      otpserviceMock.markOtpIsUsed.mockReset();
      authHistoryServiceMock.recordSignUp.mockReset();
    });

    it("should verify magic link and return otp object", async () => {
      otpserviceMock.findValidOtpOrThrow.mockResolvedValue(otpMock);
      userServiceMock.markEmailIsVerified.mockResolvedValue(userMock);
      otpserviceMock.markOtpIsUsed.mockResolvedValue(otpMock);
      authHistoryServiceMock.recordSignUp.mockResolvedValue(authHistoryMock);

      const result = await useCase.execute(verifyEmailOtpDtoMock);

      expect(otpserviceMock.findValidOtpOrThrow).toHaveBeenCalledWith(verifyEmailOtpDtoMock, entityManagerMock);
      expect(userServiceMock.markEmailIsVerified).toHaveBeenCalledWith(otpMock.user, entityManagerMock);
      expect(otpserviceMock.markOtpIsUsed).toHaveBeenCalledWith(otpMock, entityManagerMock);
      expect(authHistoryServiceMock.recordSignUp).toHaveBeenCalledWith(userMock, entityManagerMock);
      expect(result).toBe(otpMock);
    });
  });
});
