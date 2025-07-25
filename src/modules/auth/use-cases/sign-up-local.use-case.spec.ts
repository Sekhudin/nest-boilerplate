import { DataSource } from "typeorm";
import { mockDeep } from "jest-mock-extended";
import { GeneratedOtp } from "otplib";
import { Test, TestingModule } from "@nestjs/testing";
import { SignUpLocalDto } from "src/modules/auth/dto/requests/sign-up-local.dto";
import { UserAuth } from "src/modules/auth/entities/user-auth.entity";
import { UserAuthService } from "src/modules/auth/services/user-auth.service";
import { OtpService } from "src/modules/otp/otp.service";
import { Role } from "src/modules/role/entities/role.entity";
import { RoleService } from "src/modules/role/role.service";
import { User } from "src/modules/user/entities/user.entity";
import { UserService } from "src/modules/user/user.service";
import { getFreshMailerConfigMock } from "test/mocks/config/mailer.config.mock";
import { getFreshOtpServiceMock } from "test/mocks/services/otp.service.mock";
import { getFreshRoleServiceMock } from "test/mocks/services/role.service.mock";
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
  let useCase: SignUpLocalUseCase;
  const roleServiceMock = getFreshRoleServiceMock();
  const userServiceMock = getFreshUserServiceMock();
  const userAuthServiceMock = getFreshUserAuthServiceMock();
  const otpServiceMock = getFreshOtpServiceMock();
  const dataSourceMock = getFreshDataSourceMock();

  beforeEach(async () => {
    mailerConfigMock = getFreshMailerConfigMock();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignUpLocalUseCase,
        { provide: RoleService, useValue: roleServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: UserAuthService, useValue: userAuthServiceMock },
        { provide: OtpService, useValue: otpServiceMock },
        { provide: DataSource, useValue: dataSourceMock },
      ],
    }).compile();

    useCase = module.get<SignUpLocalUseCase>(SignUpLocalUseCase);
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
  });

  describe("execute", () => {
    beforeEach(() => {
      roleServiceMock.findOrCreateDefaultRole.mockReset();
      userServiceMock.createLocalUser.mockReset();
      userAuthServiceMock.createLocalUserAuth.mockReset();
      otpServiceMock.sendOtpForLocalSignup.mockReset();
    });
    it("should sign up user locally and send OTP", async () => {
      const dto: SignUpLocalDto = {
        email: "john@example.com",
        password: "@SecurePassword1",
        confirmPassword: "@SecurePassword1",
      };

      const userMock = mockDeep<User>();
      const roleMock = mockDeep<Role>();
      const userAuthMock = mockDeep<UserAuth>();
      const generatedOtp = mockDeep<GeneratedOtp>();

      userAuthMock.user = userMock;
      const entityManager = dataSourceMock.createEntityManager();

      roleServiceMock.findOrCreateDefaultRole.mockResolvedValue(roleMock);
      userServiceMock.createLocalUser.mockResolvedValue(userMock);
      userAuthServiceMock.createLocalUserAuth.mockResolvedValue(userAuthMock);
      otpServiceMock.sendOtpForLocalSignup.mockResolvedValue(generatedOtp);

      const result = await useCase.execute(dto);

      expect(dataSourceMock.transaction).toHaveBeenCalled();
      expect(userServiceMock.createLocalUser).toHaveBeenCalledWith(dto, roleMock, entityManager);
      expect(userAuthServiceMock.createLocalUserAuth).toHaveBeenCalledWith(
        userAuthMock.user,
        dto.password,
        entityManager,
      );
      expect(otpServiceMock.sendOtpForLocalSignup).toHaveBeenCalledWith(userMock, entityManager);
      expect(result).toBe(generatedOtp);
    });
  });
});
