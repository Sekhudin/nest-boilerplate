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
      strategy: "exposeAll",
      excludePrefixes: ["_"],
      enableCircularCheck: false,
    };
  }
}

export const serializerConfig = SerializerConfig.getInstance();
