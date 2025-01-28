import type { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as env from "./env.config";

export const databaseConfig: TypeOrmModuleOptions = {
  type: env.DB_TYPE as "postgres",
  database: env.DB_NAME,
  schema: env.DB_SCHEMA,
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  synchronize: !env.isProduction(),
  autoLoadEntities: true,
};

export enum TableName {
  user = "User",
  device = "Device",
  authProvider = "AuthProvider",
}

export enum UserRole {
  user = "user",
  root = "root",
}
