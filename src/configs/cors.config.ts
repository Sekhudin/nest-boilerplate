import { INestApplication } from "@nestjs/common";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { BaseConfig } from "./base.config";

class CorsConfig extends BaseConfig {
  constructor() {
    super();
  }

  get options(): CorsOptions {
    return {
      origin: this.env.CORS_ORIGIN,
      allowedHeaders: this.env.CORS_HEADERS,
      methods: this.env.CORS_METHODS,
      credentials: this.env.CORS_CREDENTIALS,
    };
  }

  setup(app: INestApplication): void {
    app.enableCors(this.options);
  }
}

export const corsConfig = CorsConfig.getInstance();
