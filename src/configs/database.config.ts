import type { TypeOrmModuleOptions } from "@nestjs/typeorm";
import type { UserRole } from "src/types/global.type";
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

export const tableName = {
  user: "User",
  device: "Device",
  authProvider: "AuthProvider",
};

export const userRole: Record<UserRole, UserRole> = {
  root: "root",
  user: "user",
  developer: "developer"
}
