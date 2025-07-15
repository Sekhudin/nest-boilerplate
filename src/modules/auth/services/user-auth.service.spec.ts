import { Test, TestingModule } from "@nestjs/testing";
import { CryptoService } from "src/shared/modules/global/crypto/crypto.service";
import { UserAuthRepository } from "src/modules/auth/repositories/user-auth.repository";
import { getFreshAuthProviderMock } from "test/mocks/entities/auth-provider.entity.mock";
import { getFreshUserAuthMock } from "test/mocks/entities/user-auth.entity.mock";
import { getFreshUserMock } from "test/mocks/entities/user.entity.mock";
import { getFreshUserAuthRepositoryMock } from "test/mocks/repositories/user-auth.repository.mock";
import { getFreshAuthProviderServiceMock } from "test/mocks/services/auth-provider.service.mock";
import { getFreshCryptoServiceMock } from "test/mocks/services/crypto.service.mock";
import { getFreshEntityManagerMock } from "test/mocks/utils/entity-manager.mock";
import { AuthProviderService } from "./auth-provider.service";
import { UserAuthService } from "./user-auth.service";

describe("UserAuthService", () => {
  let service: UserAuthService;
  const cryptoServiceMock = getFreshCryptoServiceMock();
  const authProviderServiceMock = getFreshAuthProviderServiceMock();
  const userAuthRepositoryMock = getFreshUserAuthRepositoryMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserAuthService,
        { provide: CryptoService, useValue: cryptoServiceMock },
        { provide: AuthProviderService, useValue: authProviderServiceMock },
        { provide: UserAuthRepository, useValue: userAuthRepositoryMock },
      ],
    }).compile();

    service = module.get<UserAuthService>(UserAuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("createLocalUserAuth", () => {
    const password = "@StrongPassword123";
    const userMock = getFreshUserMock();
    const userAuthMock = getFreshUserAuthMock();
    const authProviderMock = getFreshAuthProviderMock();

    beforeEach(() => {
      userAuthRepositoryMock.create.mockReset();
      authProviderServiceMock.findOrCreateLocalAuthProvider.mockReset();
      cryptoServiceMock.hashPassword.mockReset();
    });

    it("should create user-auth with default repository and return the created user-auth", async () => {
      userAuthRepositoryMock.create.mockReturnValue(userAuthMock);
      authProviderServiceMock.findOrCreateLocalAuthProvider.mockResolvedValue(authProviderMock);
      cryptoServiceMock.hashPassword.mockResolvedValue("Hashed@StrongPassword123");

      const result = await service.createLocalUserAuth(userMock, password);

      expect(userAuthRepositoryMock.create).toHaveBeenCalledWith({ user: userMock });
      expect(authProviderServiceMock.findOrCreateLocalAuthProvider).toHaveBeenCalled();
      expect(cryptoServiceMock.hashPassword).toHaveBeenCalledWith(password);
      expect(result).toBe(userAuthMock);
    });

    it("should create user-auth with entityManager and return the created user-auth", async () => {
      const entityManagerMock = getFreshEntityManagerMock();

      entityManagerMock.getRepository.mockReturnValue(userAuthRepositoryMock);
      userAuthRepositoryMock.create.mockReturnValue(userAuthMock);
      authProviderServiceMock.findOrCreateLocalAuthProvider.mockResolvedValue(authProviderMock);
      cryptoServiceMock.hashPassword.mockResolvedValue("Hashed@StrongPassword123");

      const result = await service.createLocalUserAuth(userMock, password, entityManagerMock);

      expect(userAuthRepositoryMock.create).toHaveBeenCalledWith({ user: userMock });
      expect(authProviderServiceMock.findOrCreateLocalAuthProvider).toHaveBeenCalled();
      expect(cryptoServiceMock.hashPassword).toHaveBeenCalledWith(password);
      expect(result).toBe(userAuthMock);
    });
  });
});
