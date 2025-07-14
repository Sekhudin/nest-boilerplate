import { EntityManager, EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { BaseService } from "./base.service";

class DummyEntity {}

class DummyService extends BaseService {
  public testGetRepository<T extends ObjectLiteral>(
    entity: EntityTarget<T>,
    defaultRepository: Repository<T>,
    entityManager?: EntityManager,
  ) {
    return this.getRepository<T>(entity, defaultRepository, entityManager);
  }
}

describe("BaseService", () => {
  let service: DummyService;
  let mockRepo: jest.Mocked<Repository<DummyEntity>>;
  let mockManager: jest.Mocked<EntityManager>;

  beforeEach(() => {
    service = new DummyService();

    mockRepo = {
      find: jest.fn(),
      save: jest.fn(),
      create: jest.fn(),
    } as any;

    mockManager = {
      getRepository: jest.fn().mockReturnValue("mocked-from-manager"),
    } as any;
  });

  describe("getRepository", () => {
    it("should return default repository when no entity manager is provided", () => {
      const result = service.testGetRepository(DummyEntity, mockRepo);
      expect(result).toBe(mockRepo);
    });

    it("should return repository from entity manager when provided", () => {
      const result = service.testGetRepository(DummyEntity, mockRepo, mockManager);
      expect(mockManager.getRepository).toHaveBeenCalledWith(DummyEntity);
      expect(result).toBe("mocked-from-manager");
    });
  });
});
