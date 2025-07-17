import { isMatching, P } from "ts-pattern";
import * as dotEnv from "dotenv";
import { INestApplication } from "@nestjs/common";
import { environment, Environment, envpath } from "./util/environment";

const instances = new WeakMap<Function, unknown>();
dotEnv.config({ path: envpath });

export abstract class BaseConfig {
  protected readonly env: Environment;

  protected constructor() {
    this.env = environment(process.env);
  }

  get environment() {
    return this.env.APP_ENV.toLowerCase().trim();
  }

  get isProduction(): boolean {
    return this.environment === "production";
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
