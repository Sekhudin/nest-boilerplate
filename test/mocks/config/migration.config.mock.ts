import { DataSource } from "typeorm";
import { mock } from "jest-mock-extended";

export const getFreshMigrationConfigMock = () => {
  const datasoure = mock<DataSource>();
  return datasoure;
};
