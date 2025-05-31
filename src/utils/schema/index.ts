import { BadRequestException } from "@nestjs/common";
import z from "zod";
import { StandardSchemaV1 } from "@standard-schema/spec";
import * as zr from "./required";

export const schema = <T extends z.ZodType<any, any, any>>(schema: T): StandardSchemaV1<z.infer<T>> => ({
  "~standard": {
    version: 1,
    vendor: "zod",
    validate: (value) => {
      const result = schema.safeParse(value);
      if (!result.success) {
        const issue = result.error.issues[0];
        const path = issue.path.length ? issue.path.join(".") : "root";
        throw new BadRequestException(`${path}: ${issue.message}`);
      }

      return result.data;
    },
  },
});

export { z, zr };
