import "@standard-schema/spec";
import type { StandardSchemaV1 } from "@standard-schema/spec";

declare module "@standard-schema/spec" {
  type StandarSchemaClass<T extends StandardSchemaV1> = {
    new (value: StandardSchemaV1.InferInput<T>): StandardSchemaV1.InferInput<T>;
    schema: T["~standard"];
  };
}
