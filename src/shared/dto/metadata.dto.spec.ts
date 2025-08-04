import { ErrorCode } from "src/shared/enums/error-code.enum";
import { ValidationException } from "src/shared/exceptions/validation/validation.exception";
import { MetadataDto } from "./metadata.dto";

describe("MetadataDto", () => {
  const validate = MetadataDto.schema.validate;

  const validValue: MetadataDto = {
    executionTime: "10ms",
    requestId: "request-id",
    timestamp: new Date().toISOString(),
    filters: { sortBy: "id", sortAs: "asc" },
    pagination: { page: 1, limit: 10, totalPages: 10, totalItems: 100, itemCount: 10 },
    sort: { field: "id", direction: "asc" },
  };

  it("should pass with valid value", () => {
    const result = validate(validValue);

    expect(result).toEqual(validValue);
  });

  it("should throw ValidationException if value invalid", () => {
    try {
      validate({});
    } catch (err: any) {
      expect(err).toBeInstanceOf(ValidationException);
      expect(err.message).toMatch(ErrorCode.VALIDATION_FAILED);
    }
  });
});
