import z from "zod";
import { createSchema } from "src/utils/validation.util";
import { SchemaValidation } from "./schema-validation.pipe";
import { StandardSchemaV1 } from "@standard-schema/spec";

describe("SchemaValidation class", () => {
  type Person = {
    name?: string;
    age?: number;
  };

  let schema: StandardSchemaV1<Person>;
  let common: SchemaValidation;
  let params: SchemaValidation;
  let query: SchemaValidation;
  let body: SchemaValidation;

  beforeEach(() => {
    schema = createSchema(
      z.object({
        name: z.string().min(1),
        age: z.number().min(1),
      }),
    );

    // common = new SchemaValidation(schema, "")
  });

  it("validation valid", () => {});

  it("validation invalid - should throw error", () => {});
});
