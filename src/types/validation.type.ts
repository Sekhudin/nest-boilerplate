import type { StandardSchemaV1 } from "@standard-schema/spec";
import type { ZodIssue } from "zod";

export type Dto<Schema extends StandardSchemaV1> = StandardSchemaV1.InferInput<Schema>;
export type ErrorMessage = {
  message: string;
  errors: Pick<ZodIssue, "path" | "message">[] | null;
};
export type { StandardSchemaV1 };