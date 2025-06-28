import { DataSource, DataSourceOptions } from "typeorm";
import { BaseConfig } from "./base.config";

class MigrationConfig extends BaseConfig {
  constructor() {
    super();
  }

  get options(): DataSourceOptions {
    return {
      type: this.env.DB_TYPE as "postgres",
      database: this.env.DB_NAME,
      schema: this.env.DB_SCHEMA,
      host: this.env.DB_HOST,
      port: this.env.DB_PORT,
      username: this.env.DB_USERNAME,
      password: this.env.DB_PASSWORD,
      synchronize: this.env.DB_SYNCHRONIZE,
      logging: this.env.FEATURE_DB_LOGGING_ENABLED,
      migrationsTableName: this.env.DB_MIGRATION_TABLE,
      entities: ["src/modules/**/entities/*.entity.ts"],
      migrations: [`migrations/*.ts`],
      migrationsTransactionMode: "all",
      ssl: this.env.DB_SSL,
      poolSize: this.env.DB_POOL_SIZE,
    };
  }

  get dataSource() {
    return new DataSource(this.options);
  }
}

const migrationConfig = MigrationConfig.getInstance();
export const dataSource = migrationConfig.dataSource;
