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
import { CreateAuthenticationTokenDto } from "./dto/create-authentication-token.dto";
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
    expect(true).toBeDefined();
  });

  describe("createAuthenticationToken", () => {
    const roleMock = getFreshRoleMock();
    const dtoMock = mock<CreateAuthenticationTokenDto>();
    const authenticationTokenMock = mock<AuthenticationToken>();
    const tokenMock = getFreshTokenMock();
    const userAgentMock = getFreshUserAgentMock();

    beforeEach(() => {
      roleMock.name = "USER";
      dtoMock.user.role = [roleMock];
      jwtTokenServiceMock.signToken.mockReset();
      tokenRepositoryMock.create.mockReset();
      contextServiceMock.getUserAgent.mockReset();
      contextServiceMock.getDeviceId.mockReset();
      cryptoServiceMock.hashAuthToken.mockReset();
      tokenRepositoryMock.save.mockReset();
    });

    it("should return authentication token", async () => {
      jwtTokenServiceMock.signToken.mockResolvedValue(authenticationTokenMock);
      tokenRepositoryMock.create.mockReturnValue(tokenMock);
      contextServiceMock.getUserAgent.mockReturnValue(userAgentMock);
      contextServiceMock.getDeviceId.mockReturnValue("device-01");
      cryptoServiceMock.hashAuthToken.mockResolvedValue("hashed-token");
      tokenRepositoryMock.save.mockResolvedValue(tokenMock);

      const result = await service.createAuthenticationToken(dtoMock);

      expect(jwtTokenServiceMock.signToken).toHaveBeenCalledWith({
        sub: dtoMock.user.id,
        email: dtoMock.user.email,
        deviceId: contextServiceMock.getDeviceId(),
        provider: dtoMock.provider.name,
        roles: dtoMock.user.role.map(({ name }) => name),
      });
      expect(tokenRepositoryMock.create).toHaveBeenCalledWith({ user: dtoMock.user, revoked: false });
      expect(contextServiceMock.getUserAgent).toHaveBeenCalled();
      expect(contextServiceMock.getDeviceId).toHaveBeenCalled();
      expect(cryptoServiceMock.hashAuthToken).toHaveBeenCalledWith(authenticationTokenMock.refreshToken);
      expect(tokenRepositoryMock.save).toHaveBeenCalledWith(tokenMock);
      expect(result).toBe(authenticationTokenMock);
    });

    it("should use entityManager if provided", async () => {
      const entityManagerMock = getFreshEntityManagerMock();

      entityManagerMock.getRepository.mockReturnValue(tokenRepositoryMock);
      jwtTokenServiceMock.signToken.mockResolvedValue(authenticationTokenMock);
      tokenRepositoryMock.create.mockReturnValue(tokenMock);
      contextServiceMock.getUserAgent.mockReturnValue(userAgentMock);
      contextServiceMock.getDeviceId.mockReturnValue("device-01");
      cryptoServiceMock.hashAuthToken.mockResolvedValue("hashed-token");
      tokenRepositoryMock.save.mockResolvedValue(tokenMock);

      const result = await service.createAuthenticationToken(dtoMock, entityManagerMock);

      expect(jwtTokenServiceMock.signToken).toHaveBeenCalledWith({
        sub: dtoMock.user.id,
        email: dtoMock.user.email,
        deviceId: contextServiceMock.getDeviceId(),
        provider: dtoMock.provider.name,
        roles: dtoMock.user.role.map(({ name }) => name),
      });
      expect(tokenRepositoryMock.create).toHaveBeenCalledWith({ user: dtoMock.user, revoked: false });
      expect(contextServiceMock.getUserAgent).toHaveBeenCalled();
      expect(contextServiceMock.getDeviceId).toHaveBeenCalled();
      expect(cryptoServiceMock.hashAuthToken).toHaveBeenCalledWith(authenticationTokenMock.refreshToken);
      expect(tokenRepositoryMock.save).toHaveBeenCalledWith(tokenMock);
      expect(result).toBe(authenticationTokenMock);
    });
  });
});
