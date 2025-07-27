import { DataSource } from "typeorm";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthProviderService } from "src/modules/auth-provider/auth-provider.service";
import { SignUpLocalDto } from "src/modules/auth/dto/requests/sign-up-local.dto";
import { OtpService } from "src/modules/otp/otp.service";
import { RoleService } from "src/modules/role/role.service";
import { UserAuthService } from "src/modules/user-auth/user-auth.service";
import { UserService } from "src/modules/user/user.service";
import { getFreshMailerConfigMock } from "test/mocks/config/mailer.config.mock";
import { getFreshAuthProviderMock } from "test/mocks/entities/auth-provider.entity.mock";
import { getFreshOtpMock } from "test/mocks/entities/otp.entity.mock copy";
import { getFreshRoleMock } from "test/mocks/entities/role.entity.mock";
import { getFreshUserAuthMock } from "test/mocks/entities/user-auth.entity.mock";
import { getFreshUserMock } from "test/mocks/entities/user.entity.mock";
import { getFreshAuthProviderServiceMock } from "test/mocks/services/auth-provider.service.mock";
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
  const authProviderServiceMock = getFreshAuthProviderServiceMock();
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
        { provide: AuthProviderService, useValue: authProviderServiceMock },
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
      authProviderServiceMock.findOrCreateLocalAuthProvider.mockReset();
      userAuthServiceMock.createLocalUserAuth.mockReset();
      otpServiceMock.sendOtpForLocalSignup.mockReset();
    });
    it("should sign up user locally and send OTP", async () => {
      const dto: SignUpLocalDto = {
        email: "john@example.com",
        password: "@SecurePassword1",
        confirmPassword: "@SecurePassword1",
      };

      const userMock = getFreshUserMock();
      const roleMock = getFreshRoleMock();
      const authProviderMock = getFreshAuthProviderMock();
      const userAuthMock = getFreshUserAuthMock();
      const otpMock = getFreshOtpMock();

      userAuthMock.user = userMock;
      const entityManager = dataSourceMock.createEntityManager();

      roleServiceMock.findOrCreateDefaultRole.mockResolvedValue(roleMock);
      userServiceMock.createLocalUser.mockResolvedValue(userMock);
      authProviderServiceMock.findOrCreateLocalAuthProvider.mockResolvedValue(authProviderMock);
      userAuthServiceMock.createLocalUserAuth.mockResolvedValue(userAuthMock);
      otpServiceMock.sendOtpForLocalSignup.mockResolvedValue(otpMock);

      const result = await useCase.execute(dto);

      expect(dataSourceMock.transaction).toHaveBeenCalled();
      expect(roleServiceMock.findOrCreateDefaultRole).toHaveBeenCalledWith(entityManager);
      expect(userServiceMock.createLocalUser).toHaveBeenCalledWith({ email: dto.email, role: roleMock }, entityManager);
      expect(authProviderServiceMock.findOrCreateLocalAuthProvider).toHaveBeenCalledWith(entityManager);
      expect(userAuthServiceMock.createLocalUserAuth).toHaveBeenCalledWith(
        { user: userMock, provider: authProviderMock, password: dto.password },
        entityManager,
      );
      expect(otpServiceMock.sendOtpForLocalSignup).toHaveBeenCalledWith(userMock, entityManager);
      expect(result).toBe(otpMock);
    });
  });
});
