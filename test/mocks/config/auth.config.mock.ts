import { MockConfig } from "jest-mock-extended";
import { authConfig } from "src/config/auth.config";

type AuthConfig = MockConfig<typeof authConfig>;
export const getFreshAuthConfigMock = () => {
  const config: AuthConfig = {
    environment: "test",
    isProduction: false,
    ROLES_META_KEY: "META:ROLES",
    DEFAULT_ROLE: "USER",
    ROLES: { USER: "USER", ADMIN: "ADMIN" },
    ALL_ROLES: ["USER", "ADMIN"],
    pickRoles(keys) {
      return keys.map((key) => this.ROLES[key] ?? "");
    },
    setup(app) {},
  };
  return config;
};
