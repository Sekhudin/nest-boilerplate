import { DataSource } from "typeorm";
import { mockDeep } from "jest-mock-extended";
import { GeneratedOtp } from "otplib";
import { Test, TestingModule } from "@nestjs/testing";
import { OtpService } from "src/modules/otp/otp.service";
import { User } from "src/modules/user/entities/user.entity";
import { UserService } from "src/modules/user/user.service";
import { getFreshMailerConfigMock } from "test/mocks/config/mailer.config.mock";
import { getFreshOtpServiceMock } from "test/mocks/services/otp.service.mock";
import { getFreshUserAuthServiceMock } from "test/mocks/services/user-auth.service.mock";
import { getFreshUserServiceMock } from "test/mocks/services/user.service.mock";
import { getFreshDataSourceMock } from "test/mocks/utils/datasource.mock";
import { UserAuthService } from "./services/user-auth.service";
import { UserAuth } from "./entities/user-auth.entity";
import { AuthService } from "./auth.service";
import { SignUpLocalDto } from "./dto/requests/sign-up-local.dto";

let mailerConfigMock: ReturnType<typeof getFreshMailerConfigMock>;
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
    mailerConfigMock = getFreshMailerConfigMock();
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
});
