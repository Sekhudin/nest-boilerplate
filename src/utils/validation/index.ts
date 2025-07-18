import z from "zod/v4";
import { StandardSchemaV1 } from "@standard-schema/spec";
import { SetMetadata } from "@nestjs/common";
import { BaseHttpException } from "src/shared/base/base-http.exception";
import { ValidationException } from "src/shared/exceptions/validation/validation.exception";
import { StandarSchemaClass } from "src/types/standard-shema";
import { validationConfig } from "src/config/validation.config";
import * as zr from "./schemas";

export const schema = <T extends z.ZodType<any, any, any>>(
  schema: T,
  fallback?: BaseHttpException,
): StandardSchemaV1<z.infer<T>> => ({
  "~standard": {
    version: 1,
    vendor: "zod",
    validate: (value) => {
      const result = schema.safeParse(value);
      if (!result.success) {
        const flatten = z.flattenError(result.error);
        const errors = flatten.fieldErrors as Record<string, string[]>;
        if (fallback) throw fallback;
        throw new ValidationException(errors);
      }
      return result.data;
    },
  },
});

export const Schema = <T extends StandardSchemaV1>(schema: T): StandarSchemaClass<T> => {
  @SetMetadata(validationConfig.SCHEMA_META_KEY, schema)
  class BaseShema {
    static readonly schema = schema["~standard"];
    constructor(value: StandardSchemaV1.InferInput<T>) {
      Object.assign(this, value);
    }
  }

  return BaseShema;
};

export { z, zr };
