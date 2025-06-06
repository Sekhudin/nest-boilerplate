import { ArgumentMetadata, Paramtype, PipeTransform } from "@nestjs/common";
import type { StandardSchemaV1 } from "@standard-schema/spec";
import { validate } from "src/utils/validation";
import { isMatch } from "src/utils";

export class ValidationPipe<T = unknown> implements PipeTransform {
  constructor(
    private schema: StandardSchemaV1<T>,
    private paramtype: Paramtype,
  ) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    if (isMatch(this.paramtype, metadata.type)) {
      return validate(this.schema, value);
    }
    return value;
  }
}
