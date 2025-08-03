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
import { RefreshTokenUseCase } from "./refresh-token.use-case";

describe("RefreshTokenUseCase", () => {
  let useCase: RefreshTokenUseCase;
  const tokenServiceMock = getFreshTokenServiceMock();
  const authHistoryServiceMock = getFreshAuthHistoryServiceMock();
  const dataSourceMock = getFreshDataSourceMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefreshTokenUseCase,
        { provide: TokenService, useValue: tokenServiceMock },
        { provide: AuthHistoryService, useValue: authHistoryServiceMock },
        { provide: DataSource, useValue: dataSourceMock },
      ],
    }).compile();

    useCase = module.get<RefreshTokenUseCase>(RefreshTokenUseCase);
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
  });

  describe("execute", () => {
    const refreshTokenMock = "refresh-token";
    const accessTokenMock = "access-token";
    const tokenMock = getFreshTokenMock();
    const userMock = getFreshUserMock();
    const authHistoryMock = getFreshAuthHistoryMock();
    const entityManagerMock = dataSourceMock.createEntityManager();

    beforeEach(() => {
      tokenMock.user = userMock;
      tokenServiceMock.generateAccessTokenFromClaims.mockReset();
      authHistoryServiceMock.recordRefresh.mockReset();
    });

    it("should return new access token if user and refresh token valid", async () => {
      tokenServiceMock.generateAccessTokenFromClaims.mockResolvedValue({
        token: tokenMock,
        accessToken: accessTokenMock,
      });
      authHistoryServiceMock.recordRefresh.mockResolvedValue(authHistoryMock);

      const result = await useCase.execute(refreshTokenMock);
      expect(tokenServiceMock.generateAccessTokenFromClaims).toHaveBeenCalledWith(refreshTokenMock, entityManagerMock);
      expect(authHistoryServiceMock.recordRefresh).toHaveBeenCalledWith(tokenMock.user, entityManagerMock);
      expect(result).toStrictEqual(accessTokenMock);
    });
  });
});
