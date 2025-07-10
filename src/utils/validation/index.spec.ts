import { StandardSchemaV1 } from "@standard-schema/spec";
import { BadRequestException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { validationConfig } from "src/config/validation.config";
import { Schema, schema, z } from "./index";

describe("schema helper", () => {
  const testSchema = z.object({
    email: z.email(),
    age: z.number().min(18),
  });

  const wrappedSchema = schema(testSchema);
  const GeneratedClass = Schema(wrappedSchema);

  it("should set schema metadata on the generated class", () => {
    const metadata = Reflect.getMetadata(validationConfig.SCHEMA_META_KEY, GeneratedClass);

    expect(metadata).toBeDefined();
    expect(typeof metadata["~standard"].validate).toBe("function");
  });

  it("should validate successfully and return parsed data", () => {
    const validData = { email: "test@example.com", age: 20 };
    const result = wrappedSchema["~standard"].validate(validData);
    expect(result).toEqual(validData);
  });

  it("should strip unknown fields and return only defined ones", () => {
    const validData = {
      email: "test@example.com",
      age: 20,
      name: "test",
    };

    const result = wrappedSchema["~standard"].validate(validData);
    expect(result).toEqual({ email: "test@example.com", age: 20 });
  });

  it("should throw BadRequestException with correct message on validation failure", () => {
    const invalidData = { email: "invalid-email", age: 15 };
    try {
      wrappedSchema["~standard"].validate(invalidData);
      fail("Expected BadRequestException was not thrown");
    } catch (err: any) {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.message).toMatch(/email: Invalid email/);
    }
  });

  it("should show correct path and message for nested errors", () => {
    const nestedSchema = z.object({
      user: z.object({
        username: z.string().min(3),
      }),
    });

    const wrappedNested = schema(nestedSchema);

    const invalidNestedData = { user: { username: "a" } };

    try {
      wrappedNested["~standard"].validate(invalidNestedData);
      fail("Expected BadRequestException was not thrown");
    } catch (err: any) {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.message).toMatch(/^user\.username: /);
    }
  });

  it("should throw fallback InternalServerErrorException if provided", () => {
    const fallback = new InternalServerErrorException("Internal fallback");
    const wrappedWithFallback = schema(testSchema, fallback);

    expect(() => wrappedWithFallback["~standard"].validate({ email: "a", age: 12 })).toThrowError(fallback);
  });

  it("should throw fallback UnauthorizedException if provided", () => {
    const fallback = new UnauthorizedException("Unauthorized fallback");
    const wrappedWithFallback = schema(testSchema, fallback);

    expect(() => wrappedWithFallback["~standard"].validate({ email: "invalid", age: 1 })).toThrowError(fallback);
  });

  it("should expose static schema property", () => {
    expect(GeneratedClass.schema).toBeDefined();
    expect(typeof GeneratedClass.schema.validate).toBe("function");
  });

  it("should create an instance with assigned properties", () => {
    const input = {
      email: "test@example.com",
      age: 20,
    };
    const instance = new GeneratedClass(input);
    expect(instance).toMatchObject(input);
  });

  it("should preserve type safety via zod", () => {
    const validInput: StandardSchemaV1.InferInput<typeof wrappedSchema> = {
      email: "test@example.com",
      age: 27,
    };

    const instance = new GeneratedClass(validInput);
    expect(instance.email).toBe("test@example.com");
    expect(instance.age).toBe(27);
  });

  it("should not mutate original schema", () => {
    expect(wrappedSchema["~standard"].validate).toBe(GeneratedClass.schema.validate);
  });
});
