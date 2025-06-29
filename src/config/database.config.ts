import path from "path";
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
      synchronize: this.env.DB_SYNCHRONIZE,
      autoLoadEntities: this.isProduction,
      logging: this.env.FEATURE_DB_LOGGING_ENABLED,
      entities: [path.join(__dirname, "..", "modules/**/*.entity{.ts,.js}")],
      ssl: this.env.DB_SSL,
      poolSize: this.env.DB_POOL_SIZE,
    };
  }

  get table() {
    return {
      user: "users",
      token: "tokens",
      role: "roles",
      otp: "otps",
      userAuth: "user_auths",
      authProvider: "auth_providers",
      authHistory: "auth_history",
    } as const;
  }
}

export const databaseConfig = DatabaseConfig.getInstance();
