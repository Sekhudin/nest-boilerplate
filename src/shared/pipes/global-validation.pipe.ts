import { SchemaInstance } from "@standard-schema/spec";
import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { validationConfig } from "src/config/validation.config";

@Injectable()
export class GlobalValidationPipe implements PipeTransform {
  constructor() {
  }
  transform(value: unknown, metadata: ArgumentMetadata) {
    if (!metadata.metatype) return value;
    const schema = Reflect.getMetadata(validationConfig.SCHEMA_META_KEY, metadata.metatype) as SchemaInstance;

    if (!schema) return value;
    return schema["~standard"].validate(value);
  }
}
