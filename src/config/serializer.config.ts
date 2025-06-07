import { ClassSerializerInterceptorOptions } from "@nestjs/common";
import { BaseConfig } from "./base.config";

class SerializerConfig extends BaseConfig {
  constructor() {
    super();
  }

  get META_KEY() {
    return "custom:serializer" as const;
  }

  get META_OPTIONS_KEY() {
    return "custom:serializer:options" as const;
  }

  get options(): ClassSerializerInterceptorOptions {
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
