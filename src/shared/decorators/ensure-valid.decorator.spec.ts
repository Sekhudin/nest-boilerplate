import { PIPES_METADATA } from "@nestjs/common/constants";
import { z, createSchema, requiredString } from "src/utils/validation.util";
import { SchemaValidation } from "src/shared/pipes/schema-validation.pipe";
import { EnsureValid } from "./ensure-valid.decorator";

describe("ensure-valid decorator", () => {
  const personSchema = createSchema(
    z.object({
      name: requiredString.toLowerCase(),
      age: z.string().min(1).transform(Number),
    }),
  );

  it("should return expected pipes", () => {
    const pipes = [
      new SchemaValidation(personSchema, "body"),
      new SchemaValidation(personSchema, "query"),
      new SchemaValidation(personSchema, "param"),
      new SchemaValidation(personSchema),
    ];
    class TestDecorator {
      @EnsureValid(personSchema)
      @EnsureValid(personSchema, "param")
      @EnsureValid(personSchema, "query")
      @EnsureValid(personSchema, "body")
      test() {}
    }

    const methodMetadata = Reflect.getMetadata(PIPES_METADATA, new TestDecorator().test);
    expect(methodMetadata).toEqual(pipes);
  });
});
