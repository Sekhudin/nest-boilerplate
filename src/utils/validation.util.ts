import z from "zod";
import type { StandardSchemaV1 } from "@standard-schema/spec";

export * from "./base.util";
export const createSchema = <T extends z.ZodType<any, any, any>>(
  schema: T,
): StandardSchemaV1<z.infer<typeof schema>> => ({
  "~standard": {
    version: 1,
    vendor: "zod",
    validate: (value) => schema.parse(value),
  },
});
