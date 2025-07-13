import { RoleName } from "@nestjs/passport";
import { BaseConfig } from "./base.config";

class AuthConfig extends BaseConfig {
  constructor() {
    super();
  }

  readonly ROLES = {
    USER: "USER",
    ADMIN: "ADMIN",
  } as const;

  readonly DEFAULT_ROLE = "USER";
  readonly ROLES_META_KEY = "META:ROLES";
  readonly ALL_ROLES = Object.keys(this.ROLES) as RoleName[];

  pickRoles(keys: RoleName[]) {
    return keys.map((key) => this.ROLES[key] ?? "");
  }
}

export const authConfig = AuthConfig.getInstance();
