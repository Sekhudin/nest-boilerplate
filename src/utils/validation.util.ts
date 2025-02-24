import z from "zod";
import type { StandardSchemaV1 } from "@standard-schema/spec";

export * as z from "zod";
export * from "./base.util";
export type * from "src/types/validation.type";

export const requiredString = z.string().min(1, "can't be empty!").trim();
export const createSchema = <T extends z.ZodType<any, any, any>>(
  schema: T,
): StandardSchemaV1<z.infer<typeof schema>> => ({
  "~standard": {
    version: 1,
    vendor: "zod",
    validate: (value) => schema.parse(value),
  },
});

export const getErrorMessage = (error: any): string => {
  if (error instanceof z.ZodError) {
    return error.issues[0]?.message || "validation failed";
  }
  return "validation failed";
};
