import { EntityManager } from "typeorm";
import { mock } from "jest-mock-extended";

export const getFreshEntityManagerMock = () => {
  const entityManager = mock<EntityManager>();
  return entityManager;
};
