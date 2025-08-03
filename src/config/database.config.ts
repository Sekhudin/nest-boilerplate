import path from "path";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { BaseConfig } from "./base.config";

class DatabaseConfig extends BaseConfig {
  constructor() {
    super();
  }

  readonly TABLES = {
    USER: "users",
    TOKEN: "tokens",
    ROLE: "roles",
    OTP: "otps",
    USER_AUTH: "user_auths",
    AUTH_PROVIDER: "auth_providers",
    AUTH_HISTORY: "auth_histories",
  } as const;

  readonly JOIN_TABLES = {
    USER_ROLE: "user_roles",
  } as const;

  get typeOrmModuleOptions(): TypeOrmModuleOptions {
    return {
      type: this.env.DB_TYPE as "postgres",
      database: this.env.DB_NAME,
      schema: this.env.DB_SCHEMA,
      host: this.env.DB_HOST,
      port: this.env.DB_PORT,
      username: this.env.DB_USERNAME,
      password: this.env.DB_PASSWORD,
      synchronize: this.env.DB_SYNCHRONIZE,
      autoLoadEntities: this.isProduction,
      logging: this.env.FEATURE_DB_LOGGING_ENABLED,
      entities: [path.join(__dirname, "..", "modules/**/*.entity{.ts,.js}")],
      ssl: this.env.DB_SSL,
      poolSize: this.env.DB_POOL_SIZE,
    };
  }
}

export const databaseConfig = DatabaseConfig.getInstance();
