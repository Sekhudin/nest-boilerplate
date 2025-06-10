import { applyDecorators, Paramtype, UsePipes } from "@nestjs/common";
import { StandarSchemaClass } from "@standard-schema/spec";
import { ValidationPipe } from "src/shared/pipes/validation.pipe";

export const Validate = <T extends StandarSchemaClass<any>>(schema: T, paramtype: Paramtype) => {
  return applyDecorators(UsePipes(new ValidationPipe(schema.schema, paramtype)));
};
