import { applyDecorators, ClassSerializerContextOptions, SetMetadata, Type } from "@nestjs/common";
import { serializerConfig } from "src/config/serializer.config";

export const Serialize = (dto: Type<unknown>, options?: ClassSerializerContextOptions) => {
  return applyDecorators(
    SetMetadata(serializerConfig.SERIALIZER_META_KEY, dto),
    SetMetadata(serializerConfig.SERIALIZER_OPTIONS_META_KEY, { type: dto, ...options }),
  );
};
