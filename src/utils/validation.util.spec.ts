import z from "zod";
import type { StandardSchemaV1 } from "@standard-schema/spec";
import * as validation from "./validation.util";

describe("validationUtil", () => {
  type Person = {
    name?: string;
    age?: number;
  };

  let numberSchema: StandardSchemaV1<number, number>;
  let personSchema: StandardSchemaV1<Person, Person>;

  beforeEach(() => {
    numberSchema = validation.createSchema(z.number());
    personSchema = validation.createSchema(
      z.object({
        name: z.string().min(1, "can't be empty"),
        age: z.number().min(1, "can't be empty"),
      }),
    );
  });

  describe("createSchema", () => {
    it("tobeDefined", () => {
      expect(numberSchema).toBeDefined();
      expect(numberSchema["~standard"]).toBeDefined();
      expect(numberSchema["~standard"].vendor).toBeDefined();
      expect(numberSchema["~standard"].version).toBeDefined();
      expect(numberSchema["~standard"].validate).toBeDefined();
      expect(personSchema).toBeDefined();
      expect(personSchema["~standard"]).toBeDefined();
      expect(personSchema["~standard"].vendor).toBeDefined();
      expect(personSchema["~standard"].version).toBeDefined();
      expect(personSchema["~standard"].validate).toBeDefined();
    });

    it("toBeTruthy - validation success", () => {
      expect(numberSchema["~standard"].validate(1)).toBeTruthy();
      expect(personSchema["~standard"].validate({ name: "john doe", age: 10 })).toBeTruthy();
    });

    it("should be throw validation error", async () => {
      expect(() => numberSchema["~standard"].validate("1")).toThrow(z.ZodError);
      expect(() => personSchema["~standard"].validate({ name: "", age: 10 })).toThrow(z.ZodError);
      expect(() => personSchema["~standard"].validate({ name: "john", age: 0 })).toThrow(z.ZodError);
    });
  });

  describe("getErrorMessage", () => {
    it("should return error message", () => {
      const error = new validation.z.ZodError([]);
      error.issues = [{ message: "can't be empty" } as validation.z.ZodIssue];
      expect(validation.getErrorMessage(error).message).toBe("can't be empty");
    });

    it("should return default error message", () => {
      expect(validation.getErrorMessage({}).message).toBe("validation failed");
    });
  });
});
