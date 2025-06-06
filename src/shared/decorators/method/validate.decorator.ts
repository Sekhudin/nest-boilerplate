import { applyDecorators, Paramtype, UsePipes } from "@nestjs/common";
import { StandardSchemaV1 } from "@standard-schema/spec";
import { ValidationPipe } from "src/shared/pipes/validation.pipe";

export const Validate = (schema: StandardSchemaV1, paramtype: Paramtype) => {
  return applyDecorators(UsePipes(new ValidationPipe(schema, paramtype)));
};
