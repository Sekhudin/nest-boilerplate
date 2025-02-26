import { applyDecorators, Paramtype, UsePipes } from "@nestjs/common";
import { SchemaValidation } from "src/shared/pipes/schema-validation.pipe";
import type { StandardSchemaV1 } from "src/utils/validation.util";

export const EnsureValid = (schema: StandardSchemaV1, paramtype?: Paramtype) => {
  return applyDecorators(UsePipes(new SchemaValidation(schema, paramtype)));
};
