import { Test, TestingModule } from "@nestjs/testing";
import { getFreshAuthProviderMock } from "test/mocks/entities/auth-provider.entity.mock";
import { getFreshAuthProviderRepositoryMock } from "test/mocks/repositories/auth-provider.repository.mock";
import { AuthProviderRepository } from "../repositories/auth-provider.repository";
import { AuthProviderService } from "./auth-provider.service";

describe("AuthProviderService", () => {
  let service: AuthProviderService;
  const authProviderRepositoryMock = getFreshAuthProviderRepositoryMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthProviderService, { provide: AuthProviderRepository, useValue: authProviderRepositoryMock }],
    }).compile();

    service = module.get<AuthProviderService>(AuthProviderService);
  });

  it("should be defined", () => {
    expect(true).toBeDefined();
  });

  describe("findOrCreateLocalAuthProvider", () => {
    const authProviderMock = getFreshAuthProviderMock();
    authProviderMock.name = "LOCAL";

    beforeEach(() => {
      authProviderRepositoryMock.findOne.mockReset();
      authProviderRepositoryMock.create.mockReset();
      authProviderRepositoryMock.save.mockReset();
    });

    it("should return auth provider when it exists.", async () => {
      authProviderRepositoryMock.findOneBy.mockResolvedValue(authProviderMock);

      const result = await service.findOrCreateLocalAuthProvider();

      expect(authProviderRepositoryMock.findOneBy).toHaveBeenCalledWith({ name: "LOCAL" });
      expect(result).toBe(authProviderMock);
    });

    it("should create new auth provider if it doesn't exist and then return the created auth provider", async () => {
      authProviderRepositoryMock.findOneBy.mockResolvedValue(null);
      authProviderRepositoryMock.create.mockReturnValue(authProviderMock);
      authProviderRepositoryMock.save.mockResolvedValue(authProviderMock);

      const result = await service.findOrCreateLocalAuthProvider();

      expect(authProviderRepositoryMock.findOneBy).toHaveBeenCalledWith({ name: "LOCAL" });
      expect(authProviderRepositoryMock.create).toHaveBeenCalledWith({ name: "LOCAL" });
      expect(authProviderRepositoryMock.save).toHaveBeenCalledWith(authProviderMock);
      expect(result).toBe(authProviderMock);
    });
  });
});
