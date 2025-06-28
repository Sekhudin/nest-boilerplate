import { ThrottlerModuleOptions, ThrottlerOptions } from "@nestjs/throttler";
import { BaseConfig } from "./base.config";

class ThrottlerConfig extends BaseConfig {
  constructor() {
    super();
  }

  get options(): ThrottlerModuleOptions {
    return {
      throttlers: this.throttlers,
    };
  }

  private get throttlers(): ThrottlerOptions[] {
    return [{ ttl: this.env.THROTTLER_TTL, limit: this.env.THROTTLER_LIMIT }];
  }
}

export const throttlerConfig = ThrottlerConfig.getInstance();
