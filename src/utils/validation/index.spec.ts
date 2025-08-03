import { StandardSchemaV1 } from "@standard-schema/spec";
import { ErrorCode } from "src/shared/enums/error-code.enum";
import { UnauthorizedException } from "src/shared/exceptions/auth/unauthorized.exception";
import { SystemInternalErrorException } from "src/shared/exceptions/system/system-internal-error.exception";
import { ValidationException } from "src/shared/exceptions/validation/validation.exception";
import { getFreshValidationConfigMock } from "test/mocks/config/validation.config.mock";
import { Schema, schema, z } from "./index";

describe("validation schema helper", () => {
  const testSchema = z.object({
    email: z.email(),
    age: z.number().min(18),
  });
  const validationConfigMock = getFreshValidationConfigMock();

  describe("schema", () => {
    const wrappedSchema = schema(testSchema);

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

    it("should throw ValidationException with correct message on validation failure", () => {
      const invalidData = { email: "invalid-email", age: 15 };
      try {
        wrappedSchema["~standard"].validate(invalidData);
        fail("Expected ValidationException was not thrown");
      } catch (err: any) {
        expect(err).toBeInstanceOf(ValidationException);
        expect(err.message).toMatch(ErrorCode.VALIDATION_FAILED);
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
        fail("Expected ValidationException was not thrown");
      } catch (err: any) {
        expect(err).toBeInstanceOf(ValidationException);
        expect(err.message).toMatch(ErrorCode.VALIDATION_FAILED);
      }
    });

    it("should throw fallback SystemInternalErrorException if provided", () => {
      const fallback = new SystemInternalErrorException();
      const wrappedWithFallback = schema(testSchema, fallback);

      expect(() => wrappedWithFallback["~standard"].validate({ email: "a", age: 12 })).toThrow(fallback);
    });

    it("should throw fallback UnauthorizedException if provided", () => {
      const fallback = new UnauthorizedException();
      const wrappedWithFallback = schema(testSchema, fallback);

      expect(() => wrappedWithFallback["~standard"].validate({ email: "invalid", age: 1 })).toThrow(fallback);
    });
  });

  describe("Schema", () => {
    const wrappedSchema = schema(testSchema);
    const GeneratedClass = Schema(wrappedSchema);

    it("should set schema metadata on the generated class", () => {
      const metadata = Reflect.getMetadata(validationConfigMock.SCHEMA_META_KEY, GeneratedClass);

      expect(metadata).toBeDefined();
      expect(typeof metadata["~standard"].validate).toBe("function");
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
});
