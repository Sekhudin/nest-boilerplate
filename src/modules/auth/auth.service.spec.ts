import { DataSource } from "typeorm";
import { mockDeep } from "jest-mock-extended";
import { GeneratedOtp } from "otplib";
import { Test, TestingModule } from "@nestjs/testing";
import { OtpService } from "src/modules/otp/otp.service";
import { User } from "src/modules/user/entities/user.entity";
import { UserService } from "src/modules/user/user.service";
import { getFresMailerConfigMock } from "test/mocks/config/mailer.config.mock";
import { getFreshOtpServiceMock } from "test/mocks/services/otp.service.mock";
import { getFreshUserAuthServiceMock } from "test/mocks/services/user-auth.service.mock";
import { getFreshUserServiceMock } from "test/mocks/services/user.service.mock";
import { getFreshDataSourceMock } from "test/mocks/utils/datasource.mock";
import { UserAuthService } from "./services/user-auth.service";
import { UserAuth } from "./entities/user-auth.entity";
import { AuthService } from "./auth.service";
import { SignUpLocalDto } from "./dto/sign-up-local.dto";

let mailerConfigMock: ReturnType<typeof getFresMailerConfigMock>;
jest.mock("src/config/mailer.config", () => ({
  get mailerConfig() {
    return mailerConfigMock;
  },
}));

describe("AuthService", () => {
  let service: AuthService;
  const userServiceMock = getFreshUserServiceMock();
  const userAuthServiceMock = getFreshUserAuthServiceMock();
  const otpServiceMock = getFreshOtpServiceMock();
  const datasourceMock = getFreshDataSourceMock();

  beforeEach(async () => {
    mailerConfigMock = getFresMailerConfigMock();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userServiceMock },
        { provide: UserAuthService, useValue: userAuthServiceMock },
        { provide: OtpService, useValue: otpServiceMock },
        { provide: DataSource, useValue: datasourceMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("signUpLocal", () => {
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

      const result = await service.signUpLocal(dto);
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
