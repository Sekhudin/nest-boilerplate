import { DataSource, EntityManager } from "typeorm";
import { IsolationLevel } from "typeorm/driver/types/IsolationLevel";
import { mock } from "jest-mock-extended";

type TransactionCallback<T> = (manager: EntityManager) => Promise<T>;
type TransactionArgsOne<T> = IsolationLevel | TransactionCallback<T>;

export const getFreshDataSourceMock = () => {
  const datasource = mock<DataSource>();
  const entityManager = mock<EntityManager>();

  datasource.transaction.mockImplementation(
    <T>(argsOne: TransactionArgsOne<T>, runInTransaction?: TransactionCallback<T>): Promise<T> => {
      const cb = typeof argsOne === "function" ? argsOne : runInTransaction!;
      return cb(entityManager);
    },
  );

  datasource.createEntityManager.mockReturnValue(entityManager);

  return datasource;
};
