import { mock } from "jest-mock-extended";
import { Test, TestingModule } from "@nestjs/testing";
import { ContextService } from "src/shared/modules/global/context/context.service";
import { CryptoService } from "src/shared/modules/global/crypto/crypto.service";
import { JwtTokenService } from "src/shared/modules/global/jwt-token/jwt-token.service";
import { getFreshRoleMock } from "test/mocks/entities/role.entity.mock";
import { getFreshTokenMock } from "test/mocks/entities/token.entity.mock";
import { getFreshTokenRepositoryMock } from "test/mocks/repositories/token.repository.mock";
import { getFreshContextServiceMock } from "test/mocks/services/context.service.mock";
import { getFreshCryptoServiceMock } from "test/mocks/services/crypto.service.mock";
import { getFreshJwtTokenServiceMock } from "test/mocks/services/jwt-token-service.service.mock";
import { getFreshEntityManagerMock } from "test/mocks/utils/entity-manager.mock";
import { getFreshUserAgentMock } from "test/mocks/utils/user-agent.mock";
import { UpsertAuthenticationTokenDto } from "./dto/upsert-authentication-token.dto";
import { TokenRepository } from "./token.repository";
import { TokenService } from "./token.service";

describe("TokenService", () => {
  let service: TokenService;
  const jwtTokenServiceMock = getFreshJwtTokenServiceMock();
  const cryptoServiceMock = getFreshCryptoServiceMock();
  const contextServiceMock = getFreshContextServiceMock();
  const tokenRepositoryMock = getFreshTokenRepositoryMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        { provide: TokenRepository, useValue: tokenRepositoryMock },
        { provide: JwtTokenService, useValue: jwtTokenServiceMock },
        { provide: CryptoService, useValue: cryptoServiceMock },
        { provide: ContextService, useValue: contextServiceMock },
      ],
    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("upsertAuthenticationToken", () => {
    const roleMock = getFreshRoleMock();
    const dtoMock = mock<UpsertAuthenticationTokenDto>();
    const authenticationTokenMock = mock<AuthenticationToken>();
    const tokenMock = getFreshTokenMock();
    const userAgentMock = getFreshUserAgentMock();

    beforeEach(() => {
      roleMock.name = "USER";
      dtoMock.user.role = [roleMock];
      jwtTokenServiceMock.signToken.mockReset();
      tokenRepositoryMock.create.mockReset();
      tokenRepositoryMock.save.mockReset();
      tokenRepositoryMock.findOne.mockReset();
      contextServiceMock.getUserAgent.mockReset();
      contextServiceMock.getDeviceId.mockReset();
      cryptoServiceMock.hashAuthToken.mockReset();
    });

    it("should create and return a new authentication token when no existing token found", async () => {
      jwtTokenServiceMock.signToken.mockResolvedValue(authenticationTokenMock);
      tokenRepositoryMock.findOne.mockResolvedValue(null);
      tokenRepositoryMock.create.mockReturnValue(tokenMock);
      contextServiceMock.getUserAgent.mockReturnValue(userAgentMock);
      contextServiceMock.getDeviceId.mockReturnValue("device-01");
      cryptoServiceMock.hashAuthToken.mockResolvedValue("hashed-token");
      tokenRepositoryMock.save.mockResolvedValue(tokenMock);

      const result = await service.upsertAuthenticationToken(dtoMock);

      expect(tokenRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { user: { id: dtoMock.user.id }, deviceId: "device-01" },
        relations: { user: true },
      });

      expect(jwtTokenServiceMock.signToken).toHaveBeenCalledWith({
        sub: dtoMock.user.id,
        email: dtoMock.user.email,
        deviceId: "device-01",
        provider: dtoMock.provider.name,
        roles: [roleMock.name],
      });

      expect(tokenRepositoryMock.create).toHaveBeenCalledWith({ user: dtoMock.user });
      expect(cryptoServiceMock.hashAuthToken).toHaveBeenCalledWith(authenticationTokenMock.refreshToken);
      expect(tokenRepositoryMock.save).toHaveBeenCalledWith(tokenMock);

      expect(result).toBe(authenticationTokenMock);
    });

    it("should reuse existing token if found", async () => {
      jwtTokenServiceMock.signToken.mockResolvedValue(authenticationTokenMock);
      tokenRepositoryMock.findOne.mockResolvedValue(tokenMock); // Existing token found
      contextServiceMock.getUserAgent.mockReturnValue(userAgentMock);
      contextServiceMock.getDeviceId.mockReturnValue("device-01");
      cryptoServiceMock.hashAuthToken.mockResolvedValue("hashed-token");
      tokenRepositoryMock.save.mockResolvedValue(tokenMock);

      const result = await service.upsertAuthenticationToken(dtoMock);

      expect(tokenRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { user: { id: dtoMock.user.id }, deviceId: "device-01" },
        relations: { user: true },
      });

      expect(tokenRepositoryMock.create).not.toHaveBeenCalled(); // Should reuse token
      expect(tokenRepositoryMock.save).toHaveBeenCalledWith(tokenMock);
      expect(result).toBe(authenticationTokenMock);
    });

    it("should use entityManager if provided", async () => {
      const entityManagerMock = getFreshEntityManagerMock();
      entityManagerMock.getRepository.mockReturnValue(tokenRepositoryMock);

      jwtTokenServiceMock.signToken.mockResolvedValue(authenticationTokenMock);
      tokenRepositoryMock.findOne.mockResolvedValue(null);
      tokenRepositoryMock.create.mockReturnValue(tokenMock);
      contextServiceMock.getUserAgent.mockReturnValue(userAgentMock);
      contextServiceMock.getDeviceId.mockReturnValue("device-01");
      cryptoServiceMock.hashAuthToken.mockResolvedValue("hashed-token");
      tokenRepositoryMock.save.mockResolvedValue(tokenMock);

      const result = await service.upsertAuthenticationToken(dtoMock, entityManagerMock);

      expect(entityManagerMock.getRepository).toHaveBeenCalledWith(expect.any(Function));
      expect(result).toBe(authenticationTokenMock);
    });
  });
});
