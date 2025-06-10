import { INestApplication } from "@nestjs/common";
import * as dotEnv from "dotenv";
import { isMatch } from "src/utils";
import { environment, Environment, envpath } from "./util/environment";

const instances = new WeakMap<Function, unknown>();
dotEnv.config({ path: envpath });

export abstract class BaseConfig {
  protected readonly env: Environment;

  protected constructor() {
    this.env = environment(process.env);
  }

  get role() {
    return {
      user: "user",
      admin: "admin",
    } as const;
  }

  get isProduction(): boolean {
    return isMatch(this.env.APP_ENV, "production");
  }

  get isNotProduction(): boolean {
    return !this.isProduction;
  }

  setup(app: INestApplication): void {
    throw new Error(`[${this.constructor.name}] does not implement setup(app).`);
  }

  static getInstance<T extends BaseConfig>(this: new () => T): T {
    if (!instances.has(this)) {
      instances.set(this, new this());
    }
    return instances.get(this) as T;
  }
}
