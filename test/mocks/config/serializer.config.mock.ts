import { MockConfig } from "jest-mock-extended";
import { serializerConfig } from "src/config/serializer.config";

type SerializerConfig = MockConfig<typeof serializerConfig>;
export const getFreshSerializerConfigMock = () => {
  const config: SerializerConfig = {
    environment: "test",
    isProduction: false,
    SERIALIZER_META_KEY: "META:SERIALIZER",
    SERIALIZER_OPTIONS_META_KEY: "META:SERIALIZER:OPTIONS",
    classSerializerInterceptorOptions: {
      strategy: "excludeAll",
      excludePrefixes: ["_"],
      enableCircularCheck: false,
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    },
    setup(app) {},
  };
  return config;
};
