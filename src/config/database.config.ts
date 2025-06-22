import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { BaseConfig } from "./base.config";

class DatabaseConfig extends BaseConfig {
  constructor() {
    super();
  }

  get options(): TypeOrmModuleOptions {
    return {
      type: this.env.DB_TYPE as "postgres",
      database: this.env.DB_NAME,
      schema: this.env.DB_SCHEMA,
      host: this.env.DB_HOST,
      port: this.env.DB_PORT,
      username: this.env.DB_USERNAME,
      password: this.env.DB_PASSWORD,
      synchronize: this.isProduction,
      autoLoadEntities: this.isProduction,
      logging: this.env.FEATURE_DB_LOGGING_ENABLED,
      ssl: this.env.DB_SSL,
      poolSize: this.env.DB_POOL_SIZE,
    };
  }

  get table() {
    return {
      user: "users",
      token: "tokens",
      role: "roles",
      userAuth: "user_auths",
      authProvider: "auth_providers",
    } as const;
  }
}

export const databaseConfig = DatabaseConfig.getInstance();
