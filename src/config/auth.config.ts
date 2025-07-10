import { BaseConfig } from "./base.config";

class AuthConfig extends BaseConfig {
  constructor() {
    super();
  }

  readonly ROLES_META_KEY = "META:ROLES";
  readonly DEFAULT_ROLE = "USER";

  allRoles() {
    return Object.keys(this.ROLES) as (keyof typeof this.ROLES)[];
  }

  pickRoles(keys: (keyof typeof this.ROLES)[]) {
    return keys.map((key) => this.ROLES[key] ?? "");
  }
}

export const authConfig = AuthConfig.getInstance();
