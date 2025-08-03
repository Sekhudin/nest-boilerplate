import { MockConfig } from "jest-mock-extended";
import { databaseConfig } from "src/config/database.config";

type DatabaseConfig = MockConfig<typeof databaseConfig>;
export const getFreshDatabaseConfigMock = () => {
  const config: DatabaseConfig = {
    environment: "test",
    isProduction: false,
    TABLES: {
      AUTH_HISTORY: "auth_histories",
      AUTH_PROVIDER: "auth_providers",
      OTP: "otps",
      ROLE: "roles",
      TOKEN: "tokens",
      USER: "users",
      USER_AUTH: "user_auths",
    },
    JOIN_TABLES: {
      USER_ROLE: "user_roles",
    },
    typeOrmModuleOptions: {},
    setup(app) {},
  };
  return config;
};
