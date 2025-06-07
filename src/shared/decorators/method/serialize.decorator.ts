import { applyDecorators, ClassSerializerContextOptions, SetMetadata, Type } from "@nestjs/common";
import { serializerConfig } from "src/config/serializer.config";

export const Serialize = (dto: Type<unknown>, options?: ClassSerializerContextOptions) => {
  return applyDecorators(
    SetMetadata(serializerConfig.META_KEY, dto),
    SetMetadata(serializerConfig.META_OPTIONS_KEY, { type: dto, ...options }),
  );
};
