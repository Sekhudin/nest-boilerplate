import { applyDecorators, Paramtype, UsePipes } from "@nestjs/common";
import { ValidationPipe } from "src/shared/pipes/validation.pipe";
import { StandarSchemaClass } from "src/types/global";

export const Validate = <T extends StandarSchemaClass<any>>(schema: T, paramtype: Paramtype) => {
  return applyDecorators(UsePipes(new ValidationPipe(schema.schema, paramtype)));
};
