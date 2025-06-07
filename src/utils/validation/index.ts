import { BadRequestException, HttpException } from "@nestjs/common";
import { StandardSchemaV1 } from "@standard-schema/spec";
import type { Dto } from "src/types/global";
import z from "zod/v4";
import * as zr from "./schemas";

export const schema = <T extends z.ZodType<any, any, any>>(
  schema: T,
  fallback?: HttpException,
): StandardSchemaV1<z.infer<T>> => ({
  "~standard": {
    version: 1,
    vendor: "zod",
    validate: (value) => {
      const result = schema.safeParse(value);
      if (!result.success) {
        const issue = result.error.issues[0];
        const path = issue.path.length ? issue.path.join(".") : "root";
        if (fallback) throw fallback;
        throw new BadRequestException(`${path}: ${issue.message}`);
      }

      return result.data;
    },
  },
});

export const validate = <T>(schema: StandardSchemaV1<T>, value: unknown) => {
  return schema["~standard"].validate(value);
};

export { z, zr };
export type { Dto };
