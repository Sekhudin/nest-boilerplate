import { PipeTransform, ArgumentMetadata, BadRequestException, Paramtype } from "@nestjs/common";
import type { StandardSchemaV1 } from "@standard-schema/spec";
import * as validation from "src/utils/validation.util";

export class SchemaValidation implements PipeTransform {
  constructor(
    private schema: StandardSchemaV1,
    private paramType?: Paramtype,
  ) {}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      if (validation.isMatch(this.paramType, metadata.type)) {
        return this.schema["~standard"].validate(value);
      }
      return value;
    } catch (error) {
      throw new BadRequestException(validation.getErrorMessage(error));
    }
  }
}
