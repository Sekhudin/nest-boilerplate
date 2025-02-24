import type { StandardSchemaV1 } from "@standard-schema/spec";

export type Dto<Schema extends StandardSchemaV1> = StandardSchemaV1.InferInput<Schema>;
export type { StandardSchemaV1 };