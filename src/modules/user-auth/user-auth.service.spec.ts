import { Test, TestingModule } from "@nestjs/testing";
import { CryptoService } from "src/shared/modules/global/crypto/crypto.service";
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
});
