import { ThrottlerModuleOptions, ThrottlerOptions } from "@nestjs/throttler";
import { BaseConfig } from "./base.config";

class ThrottlerConfig extends BaseConfig {
  constructor() {
    super();
  }

  get throttlerModuleOptions(): ThrottlerModuleOptions {
    return {
      throttlers: this.throttlerOptions,
    };
  }

  private get throttlerOptions(): ThrottlerOptions[] {
    return [{ ttl: this.env.THROTTLER_TTL, limit: this.env.THROTTLER_LIMIT }];
  }
}

export const throttlerConfig = ThrottlerConfig.getInstance();
