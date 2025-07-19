import { mock } from "jest-mock-extended";
import { GeneratedOtp } from "otplib";
import { Test, TestingModule } from "@nestjs/testing";
import { getFreshMailerConfigMock } from "test/mocks/config/mailer.config.mock";
import { AuthController } from "./auth.controller";
import { SignUpLocalDto } from "./dto/requests/sign-up-local.dto";
import { SignUpLocalUseCase } from "./use-cases/sign-up-local.use-case";

let mailerConfigMock: ReturnType<typeof getFreshMailerConfigMock>;
jest.mock("src/config/mailer.config", () => ({
  get mailerConfig() {
    return mailerConfigMock;
  },
}));

describe("AuthController", () => {
  let controller: AuthController;
  const signUpLocalUseCaseMock = mock<SignUpLocalUseCase>();

  beforeEach(async () => {
    mailerConfigMock = getFreshMailerConfigMock();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: SignUpLocalUseCase, useValue: signUpLocalUseCaseMock }],
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
      signUpLocalUseCaseMock.execute.mockResolvedValue(expectedResult);

      const result = await controller.signup(dto);
      expect(signUpLocalUseCaseMock.execute).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expectedResult);
    });
  });
});
