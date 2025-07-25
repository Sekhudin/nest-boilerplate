import { mock } from "jest-mock-extended";
import { GeneratedOtp } from "otplib";
import { Test, TestingModule } from "@nestjs/testing";
import { getFreshMailerConfigMock } from "test/mocks/config/mailer.config.mock";
import { AuthController } from "./auth.controller";
import { SignInLocalDto } from "./dto/requests/sign-in-local.dto";
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
    beforeEach(() => {
      signUpLocalUseCaseMock.execute.mockReset();
    });

    it("should call signUpLocalUseCaseMock.execute with signUpLocalDto and return result", async () => {
      const signUpLocalDto: SignUpLocalDto = {
        email: "test@example.com",
        password: "@Password123",
        confirmPassword: "@Password123",
      };

      const expectedResult: GeneratedOtp = { code: "123456", expiresAt: new Date(), expiresInMinutes: 5 };
      signUpLocalUseCaseMock.execute.mockResolvedValue(expectedResult);

      const result = await controller.signup(signUpLocalDto);
      expect(signUpLocalUseCaseMock.execute).toHaveBeenCalledWith(signUpLocalDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("signin", () => {
    beforeEach(() => {});

    it("should call signInLocalUseCaseMock.execute with dto and return result ", async () => {
      const signInLocalDto: SignInLocalDto = {
        email: "test@example.com",
        password: "@Password123",
      };

      const result = controller.signin(signInLocalDto);

      expect(result).toBe(true);
    });
  });
});
