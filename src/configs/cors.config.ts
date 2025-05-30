import { INestApplication } from "@nestjs/common";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { BaseConfig } from "./base.config";

class CorsConfig extends BaseConfig {
  constructor() {
    super();
  }

  get options(): CorsOptions {
    return {};
  }

  setup(app: INestApplication): void {
    app.enableCors(this.options);
  }
}

export const corsConfig = CorsConfig.getInstance();
