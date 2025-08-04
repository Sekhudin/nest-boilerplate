import { ErrorCode } from "src/shared/enums/error-code.enum";
import { ValidationException } from "src/shared/exceptions/validation/validation.exception";
import { MetaPaginationDto } from "./meta-pagination.dto";

describe("MetaPaginationDto", () => {
  const validate = MetaPaginationDto.schema.validate;

  const validValue: MetaPaginationDto = {
    page: 1,
    limit: 10,
    totalPages: 10,
    totalItems: 100,
    itemCount: 10,
  };

  it("should pass with valid value", () => {
    const result = validate(validValue);
    expect(result).toEqual(validValue);
  });

  it("should throw ValidationException if page invalid", () => {
    try {
      validate({
        ...validValue,
        page: "example",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
      expect(err.message).toMatch(ErrorCode.VALIDATION_FAILED);
    }
  });

  it("should throw ValidationException if limit is missing", () => {
    const { limit, ...value } = validValue;
    try {
      validate(value);
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
      expect(err.message).toMatch(ErrorCode.VALIDATION_FAILED);
    }
  });

  it("should throw ValidationException if totalPages is not bnumber", () => {
    try {
      validate({
        ...validValue,
        totalPages: "1234",
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
      expect(err.message).toMatch(ErrorCode.VALIDATION_FAILED);
    }
  });

  it("should throw ValidationException if totalItems is undefined", () => {
    try {
      validate({
        ...validValue,
        totalItems: undefined,
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
      expect(err.message).toMatch(ErrorCode.VALIDATION_FAILED);
    }
  });
});
