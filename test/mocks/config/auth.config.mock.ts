import { MockConfig, mockDeep } from "jest-mock-extended";
import { authConfig } from "src/config/auth.config";

type AuthConfig = MockConfig<typeof authConfig>;
export const getFresAuthConfigMock = () => {
  const config = mockDeep<AuthConfig>();

  config.pickRoles.mockImplementation((roles) => roles);

  const configMock: Partial<AuthConfig> = {
    ROLES_META_KEY: "META:ROLES",
    DEFAULT_ROLE: "USER",
    isProduction: false,
    ROLES: { USER: "USER", ADMIN: "ADMIN" },
    ALL_ROLES: ["USER", "ADMIN"],
  };

  Object.assign(config, configMock);
  return config;
};
