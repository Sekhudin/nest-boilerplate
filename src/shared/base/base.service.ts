import { EntityManager, EntityTarget, ObjectLiteral, Repository } from "typeorm";

export abstract class BaseService {
  protected getRepository<T extends ObjectLiteral>(
    entity: EntityTarget<T>,
    defaultRepository: Repository<T>,
    entityManager?: EntityManager,
  ): Repository<T> {
    return entityManager ? entityManager.getRepository(entity) : defaultRepository;
  }
}
