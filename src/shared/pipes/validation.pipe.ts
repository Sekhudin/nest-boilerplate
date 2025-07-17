import type { StandardSchemaV1 } from "@standard-schema/spec";
import { ArgumentMetadata, Paramtype, PipeTransform } from "@nestjs/common";

export class ValidationPipe<T = unknown> implements PipeTransform {
  constructor(
    private schema: StandardSchemaV1<T>["~standard"],
    private paramtype: Paramtype,
  ) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    if (this.paramtype === metadata.type) {
      return this.schema.validate(value);
    }
    return value;
  }
}
