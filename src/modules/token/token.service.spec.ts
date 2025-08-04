import { mock } from "jest-mock-extended";
import { Test, TestingModule } from "@nestjs/testing";
import { ContextService } from "src/shared/modules/global/context/context.service";
import { CryptoService } from "src/shared/modules/global/crypto/crypto.service";
import { JwtTokenService } from "src/shared/modules/global/jwt-token/jwt-token.service";
import { Claims } from "src/shared/dto/claims.dto";
import { TokenInvalidException } from "src/shared/exceptions/auth/token-invalid.exception";
import { UnauthorizedException } from "src/shared/exceptions/auth/unauthorized.exception";
import { UserInactiveException } from "src/shared/exceptions/user/user-inactive.exception";
import { getFreshRoleMock } from "test/mocks/entities/role.entity.mock";
import { getFreshTokenMock } from "test/mocks/entities/token.entity.mock";
import { getFreshUserMock } from "test/mocks/entities/user.entity.mock";
import { getFreshTokenRepositoryMock } from "test/mocks/repositories/token.repository.mock";
import { getFreshContextServiceMock } from "test/mocks/services/context.service.mock";
import { getFreshCryptoServiceMock } from "test/mocks/services/crypto.service.mock";
import { getFreshJwtTokenServiceMock } from "test/mocks/services/jwt-token-service.service.mock";
import { getFreshEntityManagerMock } from "test/mocks/utils/entity-manager.mock";
import { getFreshUserAgentMock } from "test/mocks/utils/user-agent.mock";
import { UpsertAuthenticationTokenDto } from "./dto/requests/upsert-authentication-token.dto";
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

  describe("generateAccessTokenFromClaims", () => {
    const claimsMock = mock<Claims>();
    const tokenMock = getFreshTokenMock();
    const userMock = getFreshUserMock();
    const roleMock = getFreshRoleMock();
    const accessTokenMock = "access-token";

    beforeEach(() => {
      userMock.role = [roleMock];
      tokenMock.user = userMock;

      contextServiceMock.getUser.mockReset();
      tokenRepositoryMock.findOneOrFail.mockReset();
      cryptoServiceMock.verifyAuthToken.mockReset();
      contextServiceMock.getDeviceId.mockReset();
      jwtTokenServiceMock.signAccessToken.mockReset();
    });

    it("should return object token and new access token", async () => {
      contextServiceMock.getUser.mockReturnValue(claimsMock);
      tokenRepositoryMock.findOneOrFail.mockResolvedValue(tokenMock);
      cryptoServiceMock.verifyAuthToken.mockResolvedValue(true);
      contextServiceMock.getDeviceId.mockReturnValue("device-01");
      jwtTokenServiceMock.signAccessToken.mockResolvedValue(accessTokenMock);

      const result = await service.generateAccessTokenFromClaims("refresh-token");

      expect(contextServiceMock.getUser).toHaveBeenCalled();
      expect(tokenRepositoryMock.findOneOrFail).toHaveBeenCalledWith({
        where: { deviceId: claimsMock.deviceId, revoked: false, user: { id: claimsMock.sub } },
        relations: { user: { role: true } },
      });
      expect(cryptoServiceMock.verifyAuthToken).toHaveBeenCalledWith("refresh-token", tokenMock.token);
      expect(contextServiceMock.getDeviceId).toHaveBeenCalled();
      expect(jwtTokenServiceMock.signAccessToken).toHaveBeenCalledWith({
        sub: tokenMock.user.id,
        deviceId: "device-01",
        provider: claimsMock.provider,
        roles: tokenMock.user.role.map(({ name }) => name),
      });
      expect(result).toStrictEqual({ token: tokenMock, accessToken: accessTokenMock });
    });

    it("should throw UnauthorizedException if claims is null", async () => {
      contextServiceMock.getUser.mockReturnValue(null);

      await expect(service.generateAccessTokenFromClaims("refresh-token")).rejects.toThrow(UnauthorizedException);
      expect(contextServiceMock.getUser).toHaveBeenCalled();
      expect(tokenRepositoryMock.findOneOrFail).not.toHaveBeenCalledWith({
        where: { deviceId: claimsMock.deviceId, revoked: false, user: { id: claimsMock.sub } },
        relations: { user: { role: true } },
      });
      expect(cryptoServiceMock.verifyAuthToken).not.toHaveBeenCalledWith("refresh-token", tokenMock.token);
      expect(contextServiceMock.getDeviceId).not.toHaveBeenCalled();
      expect(jwtTokenServiceMock.signAccessToken).not.toHaveBeenCalledWith({
        sub: tokenMock.user.id,
        deviceId: "device-01",
        provider: claimsMock.provider,
        roles: tokenMock.user.role.map(({ name }) => name),
      });
    });

    it("should throw TokenInvalidException if token invalid", async () => {
      contextServiceMock.getUser.mockReturnValue(claimsMock);
      tokenRepositoryMock.findOneOrFail.mockRejectedValue(new TokenInvalidException());

      await expect(service.generateAccessTokenFromClaims("refresh-token")).rejects.toThrow(TokenInvalidException);
      expect(contextServiceMock.getUser).toHaveBeenCalled();
      expect(tokenRepositoryMock.findOneOrFail).toHaveBeenCalledWith({
        where: { deviceId: claimsMock.deviceId, revoked: false, user: { id: claimsMock.sub } },
        relations: { user: { role: true } },
      });
      expect(cryptoServiceMock.verifyAuthToken).not.toHaveBeenCalledWith("refresh-token", tokenMock.token);
      expect(contextServiceMock.getDeviceId).not.toHaveBeenCalled();
      expect(jwtTokenServiceMock.signAccessToken).not.toHaveBeenCalledWith({
        sub: tokenMock.user.id,
        deviceId: "device-01",
        provider: claimsMock.provider,
        roles: tokenMock.user.role.map(({ name }) => name),
      });
    });

    it("should throw UserInactiveException id user inactive", async () => {
      tokenMock.user = { ...userMock, isActive: false };
      contextServiceMock.getUser.mockReturnValue(claimsMock);
      tokenRepositoryMock.findOneOrFail.mockResolvedValue(tokenMock);

      await expect(service.generateAccessTokenFromClaims("refresh-token")).rejects.toThrow(UserInactiveException);
      expect(contextServiceMock.getUser).toHaveBeenCalled();
      expect(tokenRepositoryMock.findOneOrFail).toHaveBeenCalledWith({
        where: { deviceId: claimsMock.deviceId, revoked: false, user: { id: claimsMock.sub } },
        relations: { user: { role: true } },
      });
      expect(cryptoServiceMock.verifyAuthToken).not.toHaveBeenCalledWith("refresh-token", tokenMock.token);
      expect(contextServiceMock.getDeviceId).not.toHaveBeenCalled();
      expect(jwtTokenServiceMock.signAccessToken).not.toHaveBeenCalledWith({
        sub: tokenMock.user.id,
        deviceId: "device-01",
        provider: claimsMock.provider,
        roles: tokenMock.user.role.map(({ name }) => name),
      });
    });

    it("should throw TokenInvalidException if refreshToken it not match", async () => {
      contextServiceMock.getUser.mockReturnValue(claimsMock);
      tokenRepositoryMock.findOneOrFail.mockResolvedValue(tokenMock);
      cryptoServiceMock.verifyAuthToken.mockResolvedValue(false);

      await expect(service.generateAccessTokenFromClaims("refresh-token")).rejects.toThrow(TokenInvalidException);
      expect(contextServiceMock.getUser).toHaveBeenCalled();
      expect(tokenRepositoryMock.findOneOrFail).toHaveBeenCalledWith({
        where: { deviceId: claimsMock.deviceId, revoked: false, user: { id: claimsMock.sub } },
        relations: { user: { role: true } },
      });
      expect(cryptoServiceMock.verifyAuthToken).toHaveBeenCalledWith("refresh-token", tokenMock.token);
      expect(contextServiceMock.getDeviceId).not.toHaveBeenCalled();
      expect(jwtTokenServiceMock.signAccessToken).not.toHaveBeenCalledWith({
        sub: tokenMock.user.id,
        deviceId: "device-01",
        provider: claimsMock.provider,
        roles: tokenMock.user.role.map(({ name }) => name),
      });
    });

    it("should use entityManager if provided", async () => {
      const entityManagerMock = getFreshEntityManagerMock();

      entityManagerMock.getRepository.mockReturnValue(tokenRepositoryMock);
      contextServiceMock.getUser.mockReturnValue(claimsMock);
      tokenRepositoryMock.findOneOrFail.mockResolvedValue(tokenMock);
      cryptoServiceMock.verifyAuthToken.mockResolvedValue(true);
      contextServiceMock.getDeviceId.mockReturnValue("device-01");
      jwtTokenServiceMock.signAccessToken.mockResolvedValue(accessTokenMock);

      const result = await service.generateAccessTokenFromClaims("refresh-token", entityManagerMock);

      expect(entityManagerMock.getRepository).toHaveBeenCalledWith(expect.any(Function));
      expect(contextServiceMock.getUser).toHaveBeenCalled();
      expect(tokenRepositoryMock.findOneOrFail).toHaveBeenCalledWith({
        where: { deviceId: claimsMock.deviceId, revoked: false, user: { id: claimsMock.sub } },
        relations: { user: { role: true } },
      });
      expect(cryptoServiceMock.verifyAuthToken).toHaveBeenCalledWith("refresh-token", tokenMock.token);
      expect(contextServiceMock.getDeviceId).toHaveBeenCalled();
      expect(jwtTokenServiceMock.signAccessToken).toHaveBeenCalledWith({
        sub: tokenMock.user.id,
        deviceId: "device-01",
        provider: claimsMock.provider,
        roles: tokenMock.user.role.map(({ name }) => name),
      });
      expect(result).toStrictEqual({ token: tokenMock, accessToken: accessTokenMock });
    });
  });

  describe("signOutAndRemoveToken", () => {
    const claimsMock = mock<Claims>();
    const tokenMock = getFreshTokenMock();
    const userMock = getFreshUserMock();
    const refreshTokenMock = "refresh-token";

    beforeEach(() => {
      tokenMock.user = userMock;

      contextServiceMock.getUser.mockReset();
      tokenRepositoryMock.findOneOrFail.mockReset();
      cryptoServiceMock.verifyAuthToken.mockReset();
      tokenRepositoryMock.remove.mockReset();
    });

    it("should remove token and return removed token object", async () => {
      contextServiceMock.getUser.mockReturnValue(claimsMock);
      tokenRepositoryMock.findOneOrFail.mockResolvedValue(tokenMock);
      cryptoServiceMock.verifyAuthToken.mockResolvedValue(true);
      tokenRepositoryMock.remove.mockResolvedValue(tokenMock);

      const result = await service.signOutAndRemoveToken(refreshTokenMock);

      expect(contextServiceMock.getUser).toHaveBeenCalled();
      expect(tokenRepositoryMock.findOneOrFail).toHaveBeenCalledWith({
        where: { deviceId: claimsMock.deviceId, revoked: false, user: { id: claimsMock.sub } },
        relations: { user: true },
      });
      expect(cryptoServiceMock.verifyAuthToken).toHaveBeenCalledWith(refreshTokenMock, tokenMock.token);
      expect(tokenRepositoryMock.remove).toHaveBeenCalledWith(tokenMock);
      expect(result).toStrictEqual(tokenMock);
    });

    it("should throw UnauthorizedException if claims is null", async () => {
      contextServiceMock.getUser.mockReturnValue(null);

      await expect(service.signOutAndRemoveToken(refreshTokenMock)).rejects.toThrow(UnauthorizedException);
      expect(contextServiceMock.getUser).toHaveBeenCalled();
      expect(tokenRepositoryMock.findOneOrFail).not.toHaveBeenCalledWith({
        where: { deviceId: claimsMock.deviceId, revoked: false, user: { id: claimsMock.sub } },
        relations: { user: true },
      });
      expect(cryptoServiceMock.verifyAuthToken).not.toHaveBeenCalledWith(refreshTokenMock, tokenMock.token);
      expect(tokenRepositoryMock.remove).not.toHaveBeenCalledWith(tokenMock);
    });

    it("should throw TokenInvalidException if token invalid", async () => {
      contextServiceMock.getUser.mockReturnValue(claimsMock);
      tokenRepositoryMock.findOneOrFail.mockRejectedValue(new TokenInvalidException());

      await expect(service.signOutAndRemoveToken(refreshTokenMock)).rejects.toThrow(TokenInvalidException);
      expect(contextServiceMock.getUser).toHaveBeenCalled();
      expect(tokenRepositoryMock.findOneOrFail).toHaveBeenCalledWith({
        where: { deviceId: claimsMock.deviceId, revoked: false, user: { id: claimsMock.sub } },
        relations: { user: true },
      });
      expect(cryptoServiceMock.verifyAuthToken).not.toHaveBeenCalledWith(refreshTokenMock, tokenMock.token);
      expect(tokenRepositoryMock.remove).not.toHaveBeenCalledWith(tokenMock);
    });

    it("should throw UserInactiveException id user inactive", async () => {
      tokenMock.user = { ...userMock, isActive: false };
      contextServiceMock.getUser.mockReturnValue(claimsMock);
      tokenRepositoryMock.findOneOrFail.mockResolvedValue(tokenMock);

      await expect(service.signOutAndRemoveToken(refreshTokenMock)).rejects.toThrow(UserInactiveException);
      expect(contextServiceMock.getUser).toHaveBeenCalled();
      expect(tokenRepositoryMock.findOneOrFail).toHaveBeenCalledWith({
        where: { deviceId: claimsMock.deviceId, revoked: false, user: { id: claimsMock.sub } },
        relations: { user: true },
      });
      expect(cryptoServiceMock.verifyAuthToken).not.toHaveBeenCalledWith(refreshTokenMock, tokenMock.token);
      expect(tokenRepositoryMock.remove).not.toHaveBeenCalledWith(tokenMock);
    });

    it("should throw TokenInvalidException if refreshToken it not match", async () => {
      contextServiceMock.getUser.mockReturnValue(claimsMock);
      tokenRepositoryMock.findOneOrFail.mockResolvedValue(tokenMock);
      cryptoServiceMock.verifyAuthToken.mockResolvedValue(false);

      await expect(service.signOutAndRemoveToken(refreshTokenMock)).rejects.toThrow(TokenInvalidException);
      expect(contextServiceMock.getUser).toHaveBeenCalled();
      expect(tokenRepositoryMock.findOneOrFail).toHaveBeenCalledWith({
        where: { deviceId: claimsMock.deviceId, revoked: false, user: { id: claimsMock.sub } },
        relations: { user: true },
      });
      expect(cryptoServiceMock.verifyAuthToken).toHaveBeenCalledWith(refreshTokenMock, tokenMock.token);
      expect(tokenRepositoryMock.remove).not.toHaveBeenCalledWith(tokenMock);
    });

    it("should use entityManager if provided", async () => {
      const entityManagerMock = getFreshEntityManagerMock();

      entityManagerMock.getRepository.mockReturnValue(tokenRepositoryMock);
      contextServiceMock.getUser.mockReturnValue(claimsMock);
      tokenRepositoryMock.findOneOrFail.mockResolvedValue(tokenMock);
      cryptoServiceMock.verifyAuthToken.mockResolvedValue(true);
      tokenRepositoryMock.remove.mockResolvedValue(tokenMock);

      const result = await service.signOutAndRemoveToken(refreshTokenMock, entityManagerMock);

      expect(contextServiceMock.getUser).toHaveBeenCalled();
      expect(tokenRepositoryMock.findOneOrFail).toHaveBeenCalledWith({
        where: { deviceId: claimsMock.deviceId, revoked: false, user: { id: claimsMock.sub } },
        relations: { user: true },
      });
      expect(cryptoServiceMock.verifyAuthToken).toHaveBeenCalledWith(refreshTokenMock, tokenMock.token);
      expect(tokenRepositoryMock.remove).toHaveBeenCalledWith(tokenMock);
      expect(result).toStrictEqual(tokenMock);
    });
  });
});
