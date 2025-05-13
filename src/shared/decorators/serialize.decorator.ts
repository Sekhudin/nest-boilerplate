import { applyDecorators, UseInterceptors, ClassSerializerInterceptor, Type } from "@nestjs/common";

export const Serialize = (dto: Type<any>) =>
  applyDecorators(UseInterceptors(ClassSerializerInterceptor), (target, key, descriptor) => {
    Reflect.defineMetadata("custom:serializer", dto, descriptor.value);
  });
