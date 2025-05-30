import type { ApiOperationOptions } from "@nestjs/swagger";
import type { StandardSchemaV1 } from "@standard-schema/spec";

export type Docs<T extends string> = Record<T, ApiOperationOptions>;
export type Dto<Schema extends StandardSchemaV1> = StandardSchemaV1.InferInput<Schema>;
export type Nullable<T extends unknown> = T | null;

export type Role = "user" | "admin";
