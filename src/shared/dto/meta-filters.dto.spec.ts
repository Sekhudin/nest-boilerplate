import { ErrorCode } from "src/shared/enums/error-code.enum";
import { ValidationException } from "src/shared/exceptions/validation/validation.exception";
import { MetaFiltersDto } from "./meta-filters.dto";

describe("MetaFiltersDto", () => {
  const validate = MetaFiltersDto.schema.validate;

  const validValue: MetaFiltersDto = {
    sortBy: "id",
    sortAs: "asc",
  };

  it("should pass with valid value", () => {
    const result = validate(validValue);
    expect(result).toEqual(validValue);
  });

  it("should throw ValidationException if sortAs invalid", () => {
    try {
      validate({
        ...validValue,
        sortAs: "example",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
      expect(err.message).toMatch(ErrorCode.VALIDATION_FAILED);
    }
  });

  it("should throw ValidationException if sortBy is missing", () => {
    const { sortBy, ...value } = validValue;
    try {
      validate(value);
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
      expect(err.message).toMatch(ErrorCode.VALIDATION_FAILED);
    }
  });

  it("should throw ValidationException if sortBy is not string", () => {
    try {
      validate({
        ...validValue,
        sortBy: 1234,
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
      expect(err.message).toMatch(ErrorCode.VALIDATION_FAILED);
    }
  });

  it("should throw ValidationException if sortBy is empty", () => {
    try {
      validate({
        ...validValue,
        sortBy: "",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
      expect(err.message).toMatch(ErrorCode.VALIDATION_FAILED);
    }
  });
});
