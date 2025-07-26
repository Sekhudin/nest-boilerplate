import { MockConfig, mockDeep } from "jest-mock-extended";
import { serializerConfig } from "src/config/serializer.config";

type SerializerConfig = MockConfig<typeof serializerConfig>;
export const getFreshSerializerConfigMock = () => {
  const config = mockDeep<SerializerConfig>();

  const configMock: Partial<SerializerConfig> = {
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
  };

  Object.assign(config, configMock);
  return config;
};
