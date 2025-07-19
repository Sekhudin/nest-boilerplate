import { DataSource } from "typeorm";
import { mockDeep } from "jest-mock-extended";
import { GeneratedOtp } from "otplib";
import { Test, TestingModule } from "@nestjs/testing";
import { SignUpLocalDto } from "src/modules/auth/dto/requests/sign-up-local.dto";
import { UserAuth } from "src/modules/auth/entities/user-auth.entity";
import { UserAuthService } from "src/modules/auth/services/user-auth.service";
import { OtpService } from "src/modules/otp/otp.service";
import { User } from "src/modules/user/entities/user.entity";
import { UserService } from "src/modules/user/user.service";
import { getFreshMailerConfigMock } from "test/mocks/config/mailer.config.mock";
import { getFreshOtpServiceMock } from "test/mocks/services/otp.service.mock";
import { getFreshUserAuthServiceMock } from "test/mocks/services/user-auth.service.mock";
import { getFreshUserServiceMock } from "test/mocks/services/user.service.mock";
import { getFreshDataSourceMock } from "test/mocks/utils/datasource.mock";
import { SignUpLocalUseCase } from "./sign-up-local.use-case";

let mailerConfigMock: ReturnType<typeof getFreshMailerConfigMock>;
jest.mock("src/config/mailer.config", () => ({
  get mailerConfig() {
    return mailerConfigMock;
  },
}));

describe("SignUpLocalUseCase", () => {
  let signUpLocalUseCase: SignUpLocalUseCase;
  const userServiceMock = getFreshUserServiceMock();
  const userAuthServiceMock = getFreshUserAuthServiceMock();
  const otpServiceMock = getFreshOtpServiceMock();
  const datasourceMock = getFreshDataSourceMock();

  beforeEach(async () => {
    mailerConfigMock = getFreshMailerConfigMock();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignUpLocalUseCase,
        { provide: UserService, useValue: userServiceMock },
        { provide: UserAuthService, useValue: userAuthServiceMock },
        { provide: OtpService, useValue: otpServiceMock },
        { provide: DataSource, useValue: datasourceMock },
      ],
    }).compile();

    signUpLocalUseCase = module.get<SignUpLocalUseCase>(SignUpLocalUseCase);
  });

  it("should be defined", () => {
    expect(signUpLocalUseCase).toBeDefined();
  });

  describe("execute", () => {
    it("should sign up user locally and send OTP", async () => {
      const dto: SignUpLocalDto = {
        email: "john@example.com",
        password: "@SecurePassword1",
        confirmPassword: "@SecurePassword1",
      };

      const userMock = mockDeep<User>();

      const userAuthMock = mockDeep<UserAuth>();
      userAuthMock.user = userMock;
      const generatedOtp = mockDeep<GeneratedOtp>();
      const entityManager = datasourceMock.createEntityManager();

      userServiceMock.createLocalUser.mockResolvedValue(userMock);
      userAuthServiceMock.createLocalUserAuth.mockResolvedValue(userAuthMock);
      otpServiceMock.sendOtpForLocalSignup.mockResolvedValue(generatedOtp);

      const result = await signUpLocalUseCase.execute(dto);
      expect(result).toBe(generatedOtp);
      expect(datasourceMock.transaction).toHaveBeenCalled();
      expect(userServiceMock.createLocalUser).toHaveBeenCalledWith(dto, entityManager);
      expect(userAuthServiceMock.createLocalUserAuth).toHaveBeenCalledWith(
        userAuthMock.user,
        dto.password,
        entityManager,
      );
      expect(otpServiceMock.sendOtpForLocalSignup).toHaveBeenCalledWith(userMock, entityManager);
    });
  });
});
