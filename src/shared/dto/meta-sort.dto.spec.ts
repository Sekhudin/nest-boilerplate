import { ErrorCode } from "src/shared/enums/error-code.enum";
import { ValidationException } from "src/shared/exceptions/validation/validation.exception";
import { MetaSortDto } from "./meta-sort.dto";

describe("MetaSortDto", () => {
  const validate = MetaSortDto.schema.validate;

  const validValue: MetaSortDto = {
    field: "id",
    direction: "asc",
  };

  it("should pass with valid value", () => {
    const result = validate(validValue);
    expect(result).toEqual(validValue);
  });

  it("should throw ValidationException if field invalid", () => {
    try {
      validate({
        ...validValue,
        field: 12,
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
      expect(err.message).toMatch(ErrorCode.VALIDATION_FAILED);
    }
  });

  it("should throw ValidationException if direction is missing", () => {
    const { direction, ...value } = validValue;
    try {
      validate(value);
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
      expect(err.message).toMatch(ErrorCode.VALIDATION_FAILED);
    }
  });

  it("should throw ValidationException if direction invalid", () => {
    try {
      validate({
        ...validValue,
        direction: "example",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
      expect(err.message).toMatch(ErrorCode.VALIDATION_FAILED);
    }
  });

  it("should throw ValidationException if field is undefined", () => {
    try {
      validate({
        ...validValue,
        field: undefined,
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
      expect(err.message).toMatch(ErrorCode.VALIDATION_FAILED);
    }
  });
});
