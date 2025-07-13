import { GeneratedOtp } from "otplib";
import { Test, TestingModule } from "@nestjs/testing";
import { getFresMailerConfigMock } from "test/mocks/config/mailer.config.mock";
import { getFreshAuthServiceMock } from "test/mocks/services/auth.service.mock";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SignUpLocalDto } from "./dto/sign-up-local.dto";

let mailerConfigMock: ReturnType<typeof getFresMailerConfigMock>;
jest.mock("src/config/mailer.config", () => ({
  get mailerConfig() {
    return mailerConfigMock;
  },
}));

describe("AuthController", () => {
  let controller: AuthController;
  const authServiceMock = getFreshAuthServiceMock();

  beforeEach(async () => {
    mailerConfigMock = getFresMailerConfigMock();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("signup", () => {
    it("should call authService.signUpLocal with dto and return result", async () => {
      const dto: SignUpLocalDto = {
        email: "test@example.com",
        password: "@Password123",
        confirmPassword: "@Password123",
      };

      const expectedResult: GeneratedOtp = { code: "123456", expiresAt: new Date(), expiresInMinutes: 5 };
      authServiceMock.signUpLocal.mockResolvedValue(expectedResult);

      const result = await controller.signup(dto);
      expect(authServiceMock.signUpLocal).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expectedResult);
    });
  });
});
