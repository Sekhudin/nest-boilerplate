import { Test, TestingModule } from "@nestjs/testing";
import { CryptoService } from "src/shared/modules/global/crypto/crypto.service";
import { UserAuthenticationFailedException } from "src/shared/exceptions/user/user-authentication-failed.exception";
import { getFreshAuthProviderMock } from "test/mocks/entities/auth-provider.entity.mock";
import { getFreshUserAuthMock } from "test/mocks/entities/user-auth.entity.mock";
import { getFreshUserMock } from "test/mocks/entities/user.entity.mock";
import { getFreshUserAuthRepositoryMock } from "test/mocks/repositories/user-auth.repository.mock";
import { getFreshCryptoServiceMock } from "test/mocks/services/crypto.service.mock";
import { getFreshEntityManagerMock } from "test/mocks/utils/entity-manager.mock";
import { CreateLocalUserAuthDto } from "./dto/requests/create-local-user-auth.dto";
import { UserAuthRepository } from "./user-auth.repository";
import { UserAuthService } from "./user-auth.service";

describe("UserAuthService", () => {
  let service: UserAuthService;
  const cryptoServiceMock = getFreshCryptoServiceMock();
  const userAuthRepositoryMock = getFreshUserAuthRepositoryMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserAuthService,
        { provide: CryptoService, useValue: cryptoServiceMock },
        { provide: UserAuthRepository, useValue: userAuthRepositoryMock },
      ],
    }).compile();

    service = module.get<UserAuthService>(UserAuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("createLocalUserAuth", () => {
    const userMock = getFreshUserMock();
    const userAuthMock = getFreshUserAuthMock();
    const authProviderMock = getFreshAuthProviderMock();
    const createLocalUserAuthDtoMock: CreateLocalUserAuthDto = {
      user: userMock,
      password: "@StrongPassword123",
      provider: authProviderMock,
    };

    beforeEach(() => {
      userAuthRepositoryMock.create.mockReset();
      cryptoServiceMock.hashPassword.mockReset();
    });

    it("should create user-auth with default repository and return the created user-auth", async () => {
      userAuthRepositoryMock.create.mockReturnValue(userAuthMock);
      cryptoServiceMock.hashPassword.mockResolvedValue("Hashed@StrongPassword123");
      userAuthRepositoryMock.save.mockResolvedValue(userAuthMock);

      const result = await service.createLocalUserAuth(createLocalUserAuthDtoMock);

      expect(userAuthRepositoryMock.create).toHaveBeenCalledWith({ user: userMock, provider: authProviderMock });
      expect(cryptoServiceMock.hashPassword).toHaveBeenCalledWith(createLocalUserAuthDtoMock.password);
      expect(userAuthRepositoryMock.save).toHaveBeenCalledWith(userAuthMock);
      expect(result).toBe(userAuthMock);
    });

    it("should create user-auth with entityManager and return the created user-auth", async () => {
      const entityManagerMock = getFreshEntityManagerMock();

      entityManagerMock.getRepository.mockReturnValue(userAuthRepositoryMock);
      userAuthRepositoryMock.create.mockReturnValue(userAuthMock);
      cryptoServiceMock.hashPassword.mockResolvedValue("Hashed@StrongPassword123");
      userAuthRepositoryMock.save.mockResolvedValue(userAuthMock);

      const result = await service.createLocalUserAuth(createLocalUserAuthDtoMock, entityManagerMock);

      expect(userAuthRepositoryMock.create).toHaveBeenCalledWith({ user: userMock, provider: authProviderMock });
      expect(cryptoServiceMock.hashPassword).toHaveBeenCalledWith(createLocalUserAuthDtoMock.password);
      expect(userAuthRepositoryMock.save).toHaveBeenCalledWith(userAuthMock);
      expect(result).toBe(userAuthMock);
    });
  });

  describe("findValidLocalUserAuthOrThrow", () => {
    const userMock = getFreshUserMock();
    const userAuthMock = getFreshUserAuthMock();

    beforeEach(() => {
      userAuthRepositoryMock.findOneOrFail.mockReset();
      cryptoServiceMock.verifyPassword.mockReset();
    });

    it("should return valid userAuthMock", async () => {
      userAuthRepositoryMock.findOneOrFail.mockResolvedValue(userAuthMock);
      cryptoServiceMock.verifyPassword.mockResolvedValue(true);

      const result = await service.findValidLocalUserAuthOrThrow({ user: userMock, password: "@Password01" });

      expect(userAuthRepositoryMock.findOneOrFail).toHaveBeenCalledWith({
        where: { id: userMock.authMethod.id },
        relations: { provider: true },
      });
      expect(cryptoServiceMock.verifyPassword).toHaveBeenCalledWith("@Password01", userAuthMock.passwordHash);
      expect(result).toBe(userAuthMock);
    });

    it("sould throw UserAuthenticationFailedException if user not-found or invalid", async () => {
      userAuthRepositoryMock.findOneOrFail.mockRejectedValue(new UserAuthenticationFailedException());

      await expect(service.findValidLocalUserAuthOrThrow({ user: userMock, password: "@Password01" })).rejects.toThrow(
        UserAuthenticationFailedException,
      );
      expect(userAuthRepositoryMock.findOneOrFail).toHaveBeenCalledWith({
        where: { id: userMock.authMethod.id },
        relations: { provider: true },
      });
      expect(cryptoServiceMock.verifyPassword).not.toHaveBeenCalledWith("@Password01", userAuthMock.passwordHash);
    });

    it("should throw UserAuthenticationFailedException if pasword invalid", async () => {
      userAuthRepositoryMock.findOneOrFail.mockResolvedValue(userAuthMock);
      cryptoServiceMock.verifyPassword.mockResolvedValue(false);

      await expect(service.findValidLocalUserAuthOrThrow({ user: userMock, password: "@Password01" })).rejects.toThrow(
        UserAuthenticationFailedException,
      );
      expect(userAuthRepositoryMock.findOneOrFail).toHaveBeenCalledWith({
        where: { id: userMock.authMethod.id },
        relations: { provider: true },
      });
      expect(cryptoServiceMock.verifyPassword).toHaveBeenCalledWith("@Password01", userAuthMock.passwordHash);
    });

    it("should use entityManager when is provider", async () => {
      const entityManager = getFreshEntityManagerMock();
      entityManager.getRepository.mockReturnValue(userAuthRepositoryMock);
      userAuthRepositoryMock.findOneOrFail.mockResolvedValue(userAuthMock);
      cryptoServiceMock.verifyPassword.mockResolvedValue(true);

      const result = await service.findValidLocalUserAuthOrThrow(
        { user: userMock, password: "@Password01" },
        entityManager,
      );

      expect(userAuthRepositoryMock.findOneOrFail).toHaveBeenCalledWith({
        where: { id: userMock.authMethod.id },
        relations: { provider: true },
      });
      expect(cryptoServiceMock.verifyPassword).toHaveBeenCalledWith("@Password01", userAuthMock.passwordHash);
      expect(result).toBe(userAuthMock);
    });
  });
});
