import type { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import * as env from "./env.config";

export const corsOptions: CorsOptions = {
  origin: env.split(env.ALLOWED_ORIGINS),
  methods: env.split(env.ALLOWED_METHODS),
  allowedHeaders: env.split(env.ALLOWED_HEADERS),
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};