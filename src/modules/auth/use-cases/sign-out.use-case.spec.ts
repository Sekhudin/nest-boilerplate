import { DataSource } from "typeorm";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthHistoryService } from "src/modules/auth-history/auth-history.service";
import { TokenService } from "src/modules/token/token.service";
import { getFreshAuthHistoryMock } from "test/mocks/entities/auth-history.entity.mock";
import { getFreshTokenMock } from "test/mocks/entities/token.entity.mock";
import { getFreshUserMock } from "test/mocks/entities/user.entity.mock";
import { getFreshAuthHistoryServiceMock } from "test/mocks/services/auth-history.service.mock";
import { getFreshTokenServiceMock } from "test/mocks/services/token.service.mock";
import { getFreshDataSourceMock } from "test/mocks/utils/datasource.mock";
import { SignOutUseCase } from "./sign-out.use-case";

describe("SignOutUseCase", () => {
  let useCase: SignOutUseCase;
  const tokenServiceMock = getFreshTokenServiceMock();
  const authHistoryServiceMock = getFreshAuthHistoryServiceMock();
  const dataSourceMock = getFreshDataSourceMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignOutUseCase,
        { provide: TokenService, useValue: tokenServiceMock },
        { provide: AuthHistoryService, useValue: authHistoryServiceMock },
        { provide: DataSource, useValue: dataSourceMock },
      ],
    }).compile();

    useCase = module.get<SignOutUseCase>(SignOutUseCase);
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
  });

  describe("execute", () => {
    const refreshTokenMock = "refresh-token";
    const tokenMock = getFreshTokenMock();
    const userMock = getFreshUserMock();
    const authHistoryMock = getFreshAuthHistoryMock();
    const entityManagerMock = dataSourceMock.createEntityManager();

    beforeEach(() => {
      tokenMock.user = userMock;
      tokenServiceMock.signOutAndRemoveToken.mockReset();
      authHistoryServiceMock.recordSignOut.mockReset();
    });

    it("should return token object if user and refresh token valid", async () => {
      tokenServiceMock.signOutAndRemoveToken.mockResolvedValue(tokenMock);
      authHistoryServiceMock.recordSignOut.mockResolvedValue(authHistoryMock);

      const result = await useCase.execute(refreshTokenMock);
      expect(tokenServiceMock.signOutAndRemoveToken).toHaveBeenCalledWith(refreshTokenMock, entityManagerMock);
      expect(authHistoryServiceMock.recordSignOut).toHaveBeenCalledWith(tokenMock.user, entityManagerMock);
      expect(result).toStrictEqual(tokenMock);
    });
  });
});
