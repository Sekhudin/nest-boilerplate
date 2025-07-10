import { ClassSerializerInterceptorOptions } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { BaseConfig } from "./base.config";

APP_FILTER;

class SerializerConfig extends BaseConfig {
  constructor() {
    super();
  }

  readonly SERIALIZER_META_KEY = "META:SERIALIZER" as const;
  readonly SERIALIZER_OPTIONS_META_KEY = "META:SERIALIZER:OPTIONS" as const;

  get classSerializerInterceptorOptions(): ClassSerializerInterceptorOptions {
    return {
      strategy: "excludeAll",
      excludePrefixes: ["_"],
      enableCircularCheck: false,
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    };
  }
}

export const serializerConfig = SerializerConfig.getInstance();
