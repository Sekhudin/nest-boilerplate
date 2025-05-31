import { BadRequestException } from "@nestjs/common";
import { schema, z } from "./index";

describe("schema helper", () => {
  const testSchema = z.object({
    email: z.string().email(),
    age: z.number().min(18),
  });

  const wrappedSchema = schema(testSchema);

  it("should validate successfully and return parsed data", () => {
    const validData = { email: "test@example.com", age: 20 };
    const result = wrappedSchema["~standard"].validate(validData);
    expect(result).toEqual(validData);
  });

  it("should throw BadRequestException with correct message on validation failure", () => {
    const invalidData = { email: "invalid-email", age: 15 };
    try {
      wrappedSchema["~standard"].validate(invalidData);
      fail("Expected BadRequestException was not thrown");
    } catch (err) {
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
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.message).toMatch(/^user\.username: /);
    }
  });
});
