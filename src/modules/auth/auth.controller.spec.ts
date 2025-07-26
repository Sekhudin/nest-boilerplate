import { mock } from "jest-mock-extended";
import { Test, TestingModule } from "@nestjs/testing";
import { MetaService } from "src/shared/modules/global/meta/meta.service";
import { getFreshMailerConfigMock } from "test/mocks/config/mailer.config.mock";
import { getFreshOtpMock } from "test/mocks/entities/otp.entity.mock copy";
import { getFreshMetaServiceMock } from "test/mocks/services/meta.service.mock";
import { getFreshMetadataMock } from "test/mocks/utils/metadata.mock";
import { AuthController } from "./auth.controller";
import { SignInLocalDto } from "./dto/requests/sign-in-local.dto";
import { SignUpLocalDto } from "./dto/requests/sign-up-local.dto";
import { SignUpLocalOtpResponse } from "./dto/responses/sign-up-local-otp.response";
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
  const metaServiceMock = getFreshMetaServiceMock();

  beforeEach(async () => {
    mailerConfigMock = getFreshMailerConfigMock();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: SignUpLocalUseCase, useValue: signUpLocalUseCaseMock },
        { provide: MetaService, useValue: metaServiceMock },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("signup", () => {
    const resultMock = mock<SignUpLocalOtpResponse>();
    const otpMock = getFreshOtpMock();
    const metadataMock = getFreshMetadataMock();
    const signUpLocalOtpResponseMock = jest.spyOn(SignUpLocalOtpResponse, "from");

    beforeEach(() => {
      signUpLocalUseCaseMock.execute.mockReset();
      metaServiceMock.build.mockReset();
      signUpLocalOtpResponseMock.mockReset();
    });

    it("should call signUpLocalUseCaseMock.execute with signUpLocalDto and return result", async () => {
      const signUpLocalDto: SignUpLocalDto = {
        email: "test@example.com",
        password: "@Password123",
        confirmPassword: "@Password123",
      };

      signUpLocalUseCaseMock.execute.mockResolvedValue(otpMock);
      metaServiceMock.build.mockReturnValue(metadataMock);
      signUpLocalOtpResponseMock.mockReturnValue(resultMock);

      const result = await controller.signup(signUpLocalDto);

      expect(signUpLocalUseCaseMock.execute).toHaveBeenCalledWith(signUpLocalDto);
      expect(signUpLocalOtpResponseMock).toHaveBeenCalledWith(otpMock, metadataMock);
      expect(result).toEqual(resultMock);
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
