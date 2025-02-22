import { BadRequestException } from "@nestjs/common";
import { mockNumberSchema, mockPersonSchema } from "src/shared/testing/mocks";
import { SchemaValidation } from "./schema-validation.pipe";

describe("SchemaValidation class", () => {
  let person: object;
  const resultPerson = {
    age: 25,
    name: "john doe",
  };
  const paramValidation = new SchemaValidation(mockNumberSchema, "param");
  const bodyValidation = new SchemaValidation(mockPersonSchema, "body");

  beforeEach(() => {
    person = {
      age: 25,
      name: "John Doe",
    };
  });

  it("validation valid", () => {
    expect(paramValidation.transform(1, { type: "param" })).toBe(1);
    expect(bodyValidation.transform(person, { type: "body" })).toStrictEqual(resultPerson);
    expect(bodyValidation.transform(person, { type: "param" })).toStrictEqual(person);
  });

  it("validation invalid - should throw error", () => {
    expect(() => paramValidation.transform("1", { type: "param" })).toThrow(BadRequestException);
    expect(() => bodyValidation.transform({}, { type: "body" })).toThrow(BadRequestException);
  });
});
