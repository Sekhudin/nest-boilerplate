import z from "zod";
import { StandardSchemaV1 } from "@standard-schema/spec";
import * as zr from "./required";

export const schema = <T extends z.ZodType<any, any, any>>(
  schema: T,
): StandardSchemaV1<z.infer<typeof schema>> => ({
  "~standard": {
    version: 1,
    vendor: "zod",
    validate: (value) => schema.parse(value),
  },
});

export { z, zr };
