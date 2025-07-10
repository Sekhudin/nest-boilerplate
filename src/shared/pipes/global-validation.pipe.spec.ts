import "reflect-metadata";
import { ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { Schema, schema, z } from "src/utils/validation";
import { GlobalValidationPipe } from "./global-validation.pipe";

describe("GlobalValidationPipe", () => {
  const pipe = new GlobalValidationPipe();

  const zodSchema = z.object({
    username: z.string().min(3),
    email: z.email(),
  });

  const fallback = new BadRequestException("Custom error");

  class ValidDto extends Schema(schema(zodSchema)) {}
  class NoSchemaDto {}

  const makeMeta = (metatype: any): ArgumentMetadata => ({
    type: "body",
    metatype,
    data: undefined,
  });

  it("should skip validation if metadata.metatype is undefined", () => {
    const value = { username: "ok" };
    const result = pipe.transform(value, makeMeta(undefined));
    expect(result).toBe(value);
  });

  it("should skip validation if schema is not registered", () => {
    const value = { username: "ok" };
    const result = pipe.transform(value, makeMeta(NoSchemaDto));
    expect(result).toBe(value);
  });

  it("should validate successfully with valid input", () => {
    const input = { username: "validUser", email: "user@example.com" };
    const result = pipe.transform(input, makeMeta(ValidDto));
    expect(result).toEqual(input);
  });

  it("should throw BadRequestException with default error", () => {
    const input = { username: "x", email: "not-an-email" };
    try {
      pipe.transform(input, makeMeta(ValidDto));
    } catch (e: any) {
      expect(e).toBeInstanceOf(BadRequestException);
      expect(e.message).toMatch(/username/);
    }
  });

  it("should throw fallback error if provided", () => {
    const fallbackSchema = z.object({
      code: z.string().uuid(),
    });

    class WithFallbackDto extends Schema(schema(fallbackSchema, fallback)) {}

    const input = { code: "not-a-uuid" };

    expect(() => pipe.transform(input, makeMeta(WithFallbackDto))).toThrow("Custom error");
  });
});
