import { Test, TestingModule } from "@nestjs/testing";
import { ContextService } from "src/shared/modules/global/context/context.service";
import { getFreshAuthHistoryMock } from "test/mocks/entities/auth-history.entity.mock";
import { getFreshUserMock } from "test/mocks/entities/user.entity.mock";
import { getFreshAuthHistoryRepositoryMock } from "test/mocks/repositories/auth-history.repository.mock";
import { getFreshContextServiceMock } from "test/mocks/services/context.service.mock";
import { getFreshEntityManagerMock } from "test/mocks/utils/entity-manager.mock";
import { getFreshUserAgentMock } from "test/mocks/utils/user-agent.mock";
import { AuthHistoryRepository } from "./auth-history.repository";
import { AuthHistoryService } from "./auth-history.service";

describe("AuthHistoryService", () => {
  let service: AuthHistoryService;
  const authHistoryRepositoryMock = getFreshAuthHistoryRepositoryMock();
  const contextServiceMock = getFreshContextServiceMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthHistoryService,
        { provide: AuthHistoryRepository, useValue: authHistoryRepositoryMock },
        { provide: ContextService, useValue: contextServiceMock },
      ],
    }).compile();

    service = module.get<AuthHistoryService>(AuthHistoryService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("recordSignUp", () => {
    const userMock = getFreshUserMock();
    const userAgentMock = getFreshUserAgentMock();
    const authHistoryMock = getFreshAuthHistoryMock();

    beforeEach(() => {
      contextServiceMock.getUserAgent.mockReset();
      authHistoryRepositoryMock.create.mockReset();
      contextServiceMock.getDeviceId.mockReset();
      authHistoryRepositoryMock.save.mockReset();
    });

    it("should create new record with action is signup", async () => {
      contextServiceMock.getUserAgent.mockReturnValue(userAgentMock);
      authHistoryRepositoryMock.create.mockReturnValue(authHistoryMock);
      contextServiceMock.getDeviceId.mockReturnValue("deviceId-123");
      authHistoryRepositoryMock.save.mockResolvedValue(authHistoryMock);

      const result = await service.recordSignUp(userMock);

      expect(contextServiceMock.getUserAgent).toHaveBeenCalled();
      expect(authHistoryRepositoryMock.create).toHaveBeenCalledWith({ user: userMock, action: "SIGNUP" });
      expect(contextServiceMock.getDeviceId).toHaveBeenCalled();
      expect(authHistoryRepositoryMock.save).toHaveBeenCalledWith(authHistoryMock);
      expect(result).toBe(authHistoryMock);
    });

    it("should use entityManager if provided", async () => {
      const entityManager = getFreshEntityManagerMock();

      entityManager.getRepository.mockReturnValue(authHistoryRepositoryMock);
      contextServiceMock.getUserAgent.mockReturnValue(userAgentMock);
      authHistoryRepositoryMock.create.mockReturnValue(authHistoryMock);
      contextServiceMock.getDeviceId.mockReturnValue("deviceId-123");
      authHistoryRepositoryMock.save.mockResolvedValue(authHistoryMock);

      const result = await service.recordSignUp(userMock, entityManager);

      expect(contextServiceMock.getUserAgent).toHaveBeenCalled();
      expect(authHistoryRepositoryMock.create).toHaveBeenCalledWith({ user: userMock, action: "SIGNUP" });
      expect(contextServiceMock.getDeviceId).toHaveBeenCalled();
      expect(authHistoryRepositoryMock.save).toHaveBeenCalledWith(authHistoryMock);
      expect(result).toBe(authHistoryMock);
    });
  });

  describe("recordSignIn", () => {
    const userMock = getFreshUserMock();
    const userAgentMock = getFreshUserAgentMock();
    const authHistoryMock = getFreshAuthHistoryMock();

    beforeEach(() => {
      contextServiceMock.getUserAgent.mockReset();
      authHistoryRepositoryMock.create.mockReset();
      contextServiceMock.getDeviceId.mockReset();
      authHistoryRepositoryMock.save.mockReset();
    });

    it("should create new record with action is signup", async () => {
      contextServiceMock.getUserAgent.mockReturnValue(userAgentMock);
      authHistoryRepositoryMock.create.mockReturnValue(authHistoryMock);
      contextServiceMock.getDeviceId.mockReturnValue("deviceId-123");
      authHistoryRepositoryMock.save.mockResolvedValue(authHistoryMock);

      const result = await service.recordSignIn(userMock);

      expect(contextServiceMock.getUserAgent).toHaveBeenCalled();
      expect(authHistoryRepositoryMock.create).toHaveBeenCalledWith({ user: userMock, action: "SIGNIN" });
      expect(contextServiceMock.getDeviceId).toHaveBeenCalled();
      expect(authHistoryRepositoryMock.save).toHaveBeenCalledWith(authHistoryMock);
      expect(result).toBe(authHistoryMock);
    });

    it("should use entityManager if provided", async () => {
      const entityManager = getFreshEntityManagerMock();

      entityManager.getRepository.mockReturnValue(authHistoryRepositoryMock);
      contextServiceMock.getUserAgent.mockReturnValue(userAgentMock);
      authHistoryRepositoryMock.create.mockReturnValue(authHistoryMock);
      contextServiceMock.getDeviceId.mockReturnValue("deviceId-123");
      authHistoryRepositoryMock.save.mockResolvedValue(authHistoryMock);

      const result = await service.recordSignIn(userMock, entityManager);

      expect(contextServiceMock.getUserAgent).toHaveBeenCalled();
      expect(authHistoryRepositoryMock.create).toHaveBeenCalledWith({ user: userMock, action: "SIGNIN" });
      expect(contextServiceMock.getDeviceId).toHaveBeenCalled();
      expect(authHistoryRepositoryMock.save).toHaveBeenCalledWith(authHistoryMock);
      expect(result).toBe(authHistoryMock);
    });
  });

  describe("recordRefresh", () => {
    const userMock = getFreshUserMock();
    const userAgentMock = getFreshUserAgentMock();
    const authHistoryMock = getFreshAuthHistoryMock();

    beforeEach(() => {
      contextServiceMock.getUserAgent.mockReset();
      authHistoryRepositoryMock.create.mockReset();
      contextServiceMock.getDeviceId.mockReset();
      authHistoryRepositoryMock.save.mockReset();
    });

    it("should create new record with action is signup", async () => {
      contextServiceMock.getUserAgent.mockReturnValue(userAgentMock);
      authHistoryRepositoryMock.create.mockReturnValue(authHistoryMock);
      contextServiceMock.getDeviceId.mockReturnValue("deviceId-123");
      authHistoryRepositoryMock.save.mockResolvedValue(authHistoryMock);

      const result = await service.recordRefresh(userMock);

      expect(contextServiceMock.getUserAgent).toHaveBeenCalled();
      expect(authHistoryRepositoryMock.create).toHaveBeenCalledWith({ user: userMock, action: "REFRESH" });
      expect(contextServiceMock.getDeviceId).toHaveBeenCalled();
      expect(authHistoryRepositoryMock.save).toHaveBeenCalledWith(authHistoryMock);
      expect(result).toBe(authHistoryMock);
    });

    it("should use entityManager if provided", async () => {
      const entityManager = getFreshEntityManagerMock();

      entityManager.getRepository.mockReturnValue(authHistoryRepositoryMock);
      contextServiceMock.getUserAgent.mockReturnValue(userAgentMock);
      authHistoryRepositoryMock.create.mockReturnValue(authHistoryMock);
      contextServiceMock.getDeviceId.mockReturnValue("deviceId-123");
      authHistoryRepositoryMock.save.mockResolvedValue(authHistoryMock);

      const result = await service.recordRefresh(userMock, entityManager);

      expect(contextServiceMock.getUserAgent).toHaveBeenCalled();
      expect(authHistoryRepositoryMock.create).toHaveBeenCalledWith({ user: userMock, action: "REFRESH" });
      expect(contextServiceMock.getDeviceId).toHaveBeenCalled();
      expect(authHistoryRepositoryMock.save).toHaveBeenCalledWith(authHistoryMock);
      expect(result).toBe(authHistoryMock);
    });
  });

  describe("recordSignOut", () => {
    const userMock = getFreshUserMock();
    const userAgentMock = getFreshUserAgentMock();
    const authHistoryMock = getFreshAuthHistoryMock();

    beforeEach(() => {
      contextServiceMock.getUserAgent.mockReset();
      authHistoryRepositoryMock.create.mockReset();
      contextServiceMock.getDeviceId.mockReset();
      authHistoryRepositoryMock.save.mockReset();
    });

    it("should create new record with action is signup", async () => {
      contextServiceMock.getUserAgent.mockReturnValue(userAgentMock);
      authHistoryRepositoryMock.create.mockReturnValue(authHistoryMock);
      contextServiceMock.getDeviceId.mockReturnValue("deviceId-123");
      authHistoryRepositoryMock.save.mockResolvedValue(authHistoryMock);

      const result = await service.recordSignOut(userMock);

      expect(contextServiceMock.getUserAgent).toHaveBeenCalled();
      expect(authHistoryRepositoryMock.create).toHaveBeenCalledWith({ user: userMock, action: "SIGNOUT" });
      expect(contextServiceMock.getDeviceId).toHaveBeenCalled();
      expect(authHistoryRepositoryMock.save).toHaveBeenCalledWith(authHistoryMock);
      expect(result).toBe(authHistoryMock);
    });

    it("should use entityManager if provided", async () => {
      const entityManager = getFreshEntityManagerMock();

      entityManager.getRepository.mockReturnValue(authHistoryRepositoryMock);
      contextServiceMock.getUserAgent.mockReturnValue(userAgentMock);
      authHistoryRepositoryMock.create.mockReturnValue(authHistoryMock);
      contextServiceMock.getDeviceId.mockReturnValue("deviceId-123");
      authHistoryRepositoryMock.save.mockResolvedValue(authHistoryMock);

      const result = await service.recordSignOut(userMock, entityManager);

      expect(contextServiceMock.getUserAgent).toHaveBeenCalled();
      expect(authHistoryRepositoryMock.create).toHaveBeenCalledWith({ user: userMock, action: "SIGNOUT" });
      expect(contextServiceMock.getDeviceId).toHaveBeenCalled();
      expect(authHistoryRepositoryMock.save).toHaveBeenCalledWith(authHistoryMock);
      expect(result).toBe(authHistoryMock);
    });
  });
});
