import { DataSource, DataSourceOptions } from "typeorm";
import * as env from "./env.config";

const options: Pick<DataSourceOptions, "entities" | "migrations"> = {
  entities: env.isProduction()
    ? ["dist/src/modules/**/entities/*.entity.js"]
    : ["src/modules/**/entities/*.entity.ts"],
  migrations: env.isProduction() ? ["dist/migrations/*.js"] : ["migrations/*.ts"],
};

const dataSourceOptions: DataSourceOptions = {
  type: env.DB_TYPE as "postgres",
  database: env.DB_NAME,
  schema: env.DB_SCHEMA,
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  synchronize: false,
  logging: true,
  migrationsTableName: env.DB_MIGRATION_TABLE,
  ...options,
};

export const dataSource = new DataSource(dataSourceOptions);
