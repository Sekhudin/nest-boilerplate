import { mock } from "jest-mock-extended";
import { Test, TestingModule } from "@nestjs/testing";
import { CookieService } from "src/shared/modules/global/context/cookie.service";
import { MetaService } from "src/shared/modules/global/meta/meta.service";
import { getFreshMailerConfigMock } from "test/mocks/config/mailer.config.mock";
import { getFreshOtpMock } from "test/mocks/entities/otp.entity.mock copy";
import { getFreshTokenMock } from "test/mocks/entities/token.entity.mock";
import { getFreshCookieServiceMock } from "test/mocks/services/cookie.service.mock";
import { getFreshMetaServiceMock } from "test/mocks/services/meta.service.mock";
import { getFreshMetadataMock } from "test/mocks/utils/metadata.mock";
import { AuthController } from "./auth.controller";
import { SignInLocalDto } from "./dto/requests/sign-in-local.dto";
import { SignUpLocalDto } from "./dto/requests/sign-up-local.dto";
import { RefreshTokenResponse } from "./dto/responses/refresh-token.response";
import { SignInTokenResponse } from "./dto/responses/sign-in-token.response";
import { SignOutResponse } from "./dto/responses/sign-out.response";
import { SignUpLocalOtpResponse } from "./dto/responses/sign-up-local-otp.response";
import { RefreshTokenUseCase } from "./use-cases/refresh-token.use-case";
import { SignInLocalUseCase } from "./use-cases/sign-in-local.use-case";
import { SignOutUseCase } from "./use-cases/sign-out.use-case";
import { SignUpLocalUseCase } from "./use-cases/sign-up-local.use-case";

let mailerConfigMock: ReturnType<typeof getFreshMailerConfigMock>;
jest.mock("src/config/mailer.config", () => ({
  get mailerConfig() {
    return mailerConfigMock;
  },
}));

describe("AuthController", () => {
  let controller: AuthController;
  const cookieServiceMock = getFreshCookieServiceMock();
  const signUpLocalUseCaseMock = mock<SignUpLocalUseCase>();
  const signInLocalUseCaseMock = mock<SignInLocalUseCase>();
  const refreshTokenUseCaseMock = mock<RefreshTokenUseCase>();
  const signOutUseCaseMock = mock<SignOutUseCase>();
  const metaServiceMock = getFreshMetaServiceMock();

  beforeEach(async () => {
    mailerConfigMock = getFreshMailerConfigMock();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: CookieService, useValue: cookieServiceMock },
        { provide: SignUpLocalUseCase, useValue: signUpLocalUseCaseMock },
        { provide: SignInLocalUseCase, useValue: signInLocalUseCaseMock },
        { provide: RefreshTokenUseCase, useValue: refreshTokenUseCaseMock },
        { provide: SignOutUseCase, useValue: signOutUseCaseMock },
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
    const signUpLocalDtoMock: SignUpLocalDto = {
      email: "test@example.com",
      password: "@Password123",
      confirmPassword: "@Password123",
    };

    beforeEach(() => {
      signUpLocalUseCaseMock.execute.mockReset();
      metaServiceMock.build.mockReset();
      signUpLocalOtpResponseMock.mockReset();
    });
    it("should call signUpLocalUseCaseMock.execute with signUpLocalDto and return result", async () => {
      signUpLocalUseCaseMock.execute.mockResolvedValue(otpMock);
      metaServiceMock.build.mockReturnValue(metadataMock);
      signUpLocalOtpResponseMock.mockReturnValue(resultMock);

      const result = await controller.signupLocal(signUpLocalDtoMock);

      expect(signUpLocalUseCaseMock.execute).toHaveBeenCalledWith(signUpLocalDtoMock);
      expect(signUpLocalOtpResponseMock).toHaveBeenCalledWith(otpMock, metadataMock);
      expect(result).toEqual(resultMock);
    });
  });

  describe("signin", () => {
    const resultMock = mock<SignInTokenResponse>();
    const authenticationTokenMock = mock<AuthenticationToken>();
    const metadataMock = getFreshMetadataMock();
    const signInTokenResponseMock = jest.spyOn(SignInTokenResponse, "from");
    const signInLocalDtoMock: SignInLocalDto = {
      email: "test@example.com",
      password: "@Password123",
    };

    beforeEach(() => {
      signInLocalUseCaseMock.execute.mockReset();
      metaServiceMock.build.mockReset();
      signInTokenResponseMock.mockReset();
    });
    it("should call signInLocalUseCaseMock.execute with dto and return result ", async () => {
      signInLocalUseCaseMock.execute.mockResolvedValue(authenticationTokenMock);
      metaServiceMock.build.mockReturnValue(metadataMock);
      signInTokenResponseMock.mockReturnValue(resultMock);

      const result = await controller.signinLocal(signInLocalDtoMock);

      expect(signInLocalUseCaseMock.execute).toHaveBeenCalledWith(signInLocalDtoMock);
      expect(cookieServiceMock.setRefreshToken).toHaveBeenCalledWith(authenticationTokenMock.refreshToken);
      expect(signInTokenResponseMock).toHaveBeenCalledWith(authenticationTokenMock, metadataMock);
      expect(result).toEqual(resultMock);
    });
  });

  describe("refresh", () => {
    const refreshTokenMock = "refresh-token";
    const accessTokenMock = "access-token";
    const resultMock = mock<RefreshTokenResponse>();
    const metadataMock = getFreshMetadataMock();
    const refreshTokenResponseMock = jest.spyOn(RefreshTokenResponse, "from");

    beforeEach(() => {
      cookieServiceMock.getRefreshToken.mockReset();
      refreshTokenUseCaseMock.execute.mockReset();
      metaServiceMock.build.mockReset();
      refreshTokenResponseMock.mockReset();
    });

    it("should call refreshTokenUseCase.execute and return result", async () => {
      cookieServiceMock.getRefreshToken.mockReturnValue(refreshTokenMock);
      refreshTokenUseCaseMock.execute.mockResolvedValue(accessTokenMock);
      metaServiceMock.build.mockReturnValue(metadataMock);
      refreshTokenResponseMock.mockReturnValue(resultMock);

      const result = await controller.refreshToken();

      expect(cookieServiceMock.getRefreshToken).toHaveBeenCalled();
      expect(refreshTokenUseCaseMock.execute).toHaveBeenCalledWith(refreshTokenMock);
      expect(refreshTokenResponseMock).toHaveBeenCalledWith({ accessToken: accessTokenMock }, metadataMock);
      expect(result).toEqual(resultMock);
    });
  });

  describe("signout", () => {
    const refreshTokenMock = "refresh-token";
    const tokemMock = getFreshTokenMock();
    const resultMock = mock<SignOutResponse>();
    const metadataMock = getFreshMetadataMock();
    const signOutResponseMock = jest.spyOn(SignOutResponse, "from");

    beforeEach(() => {
      cookieServiceMock.getRefreshToken.mockReset();
      signOutUseCaseMock.execute.mockReset();
      metaServiceMock.build.mockReset();
      signOutResponseMock.mockReset();
    });

    it("should call signOutUseCase.execute and return result", async () => {
      cookieServiceMock.getRefreshToken.mockReturnValue(refreshTokenMock);
      signOutUseCaseMock.execute.mockResolvedValue(tokemMock);
      metaServiceMock.build.mockReturnValue(metadataMock);
      signOutResponseMock.mockReturnValue(resultMock);

      const result = await controller.signOut();

      expect(cookieServiceMock.getRefreshToken).toHaveBeenCalled();
      expect(signOutUseCaseMock.execute).toHaveBeenCalledWith(refreshTokenMock);
      expect(signOutResponseMock).toHaveBeenCalledWith(tokemMock, metadataMock);
      expect(result).toEqual(resultMock);
    });
  });
});
