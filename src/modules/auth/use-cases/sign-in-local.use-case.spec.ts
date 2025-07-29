import { DataSource } from "typeorm";
import { mock } from "jest-mock-extended";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthHistoryService } from "src/modules/auth-history/auth-history.service";
import { TokenService } from "src/modules/token/token.service";
import { UserAuthService } from "src/modules/user-auth/user-auth.service";
import { UserService } from "src/modules/user/user.service";
import { getFreshAuthHistoryMock } from "test/mocks/entities/auth-history.entity.mock";
import { getFreshUserAuthMock } from "test/mocks/entities/user-auth.entity.mock";
import { getFreshUserMock } from "test/mocks/entities/user.entity.mock";
import { getFreshAuthHistoryServiceMock } from "test/mocks/services/auth-history.service.mock";
import { getFreshTokenServiceMock } from "test/mocks/services/token.service.mock";
import { getFreshUserAuthServiceMock } from "test/mocks/services/user-auth.service.mock";
import { getFreshUserServiceMock } from "test/mocks/services/user.service.mock";
import { getFreshDataSourceMock } from "test/mocks/utils/datasource.mock";
import { SignInLocalDto } from "../dto/requests/sign-in-local.dto";
import { SignInLocalUseCase } from "./sign-in-local.use-case";

describe("SignInLocalUseCase", () => {
  let useCase: SignInLocalUseCase;
  const userServiceMock = getFreshUserServiceMock();
  const userAuthServiceMock = getFreshUserAuthServiceMock();
  const tokenServiceMock = getFreshTokenServiceMock();
  const authHistoryServiceMock = getFreshAuthHistoryServiceMock();
  const dataSourceMock = getFreshDataSourceMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignInLocalUseCase,
        { provide: UserService, useValue: userServiceMock },
        { provide: UserAuthService, useValue: userAuthServiceMock },
        { provide: TokenService, useValue: tokenServiceMock },
        { provide: AuthHistoryService, useValue: authHistoryServiceMock },
        { provide: DataSource, useValue: dataSourceMock },
      ],
    }).compile();

    useCase = module.get<SignInLocalUseCase>(SignInLocalUseCase);
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
  });

  describe("execute", () => {
    const userMock = getFreshUserMock();
    const userAuthMock = getFreshUserAuthMock();
    const authHistoryMock = getFreshAuthHistoryMock();
    const authenticationTokenMock = mock<AuthenticationToken>();
    const entityManager = dataSourceMock.createEntityManager();

    beforeEach(() => {
      userServiceMock.findRegisteredUserOrThrow.mockReset();
      userAuthServiceMock.findValidLocalUserAuthOrThrow.mockReset();
      tokenServiceMock.upsertAuthenticationToken.mockReset();
      authHistoryServiceMock.recordSignIn.mockReset();
    });

    it("should sign in if user valid and return authentication token", async () => {
      const dto: SignInLocalDto = {
        email: "john@example.com",
        password: "@SecurePassword1",
      };

      userServiceMock.findRegisteredUserOrThrow.mockResolvedValue(userMock);
      userAuthServiceMock.findValidLocalUserAuthOrThrow.mockResolvedValue(userAuthMock);
      tokenServiceMock.upsertAuthenticationToken.mockResolvedValue(authenticationTokenMock);
      authHistoryServiceMock.recordSignIn.mockResolvedValue(authHistoryMock);

      const result = await useCase.execute(dto);

      expect(dataSourceMock.transaction).toHaveBeenCalled();
      expect(userServiceMock.findRegisteredUserOrThrow).toHaveBeenCalledWith(dto.email, entityManager);
      expect(userAuthServiceMock.findValidLocalUserAuthOrThrow).toHaveBeenCalledWith(
        { user: userMock, password: dto.password },
        entityManager,
      );

      expect(tokenServiceMock.upsertAuthenticationToken).toHaveBeenCalledWith(
        { user: userMock, provider: userAuthMock.provider },
        entityManager,
      );
      expect(authHistoryServiceMock.recordSignIn).toHaveBeenCalledWith(userMock, entityManager);
      expect(result).toBe(authenticationTokenMock);
    });
  });
});
