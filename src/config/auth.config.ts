import { BaseConfig } from "./base.config";

class AuthConfig extends BaseConfig {
  constructor() {
    super();
  }

  get META_KEY_ROLE() {
    return "roles" as const;
  }

  allRoles() {
    return Object.keys(this.role) as (keyof typeof this.role)[];
  }

  pickRoles(keys: (keyof typeof this.role)[]) {
    return keys.map((key) => this.role[key] ?? "");
  }
}

export const authConfig = AuthConfig.getInstance();
