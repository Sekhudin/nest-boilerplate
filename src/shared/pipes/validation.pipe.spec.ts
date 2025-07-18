import { ArgumentMetadata } from "@nestjs/common";
import { ValidationException } from "src/shared/exceptions/validation/validation.exception";
import { ValidationPipe } from "./validation.pipe";

const mockSchema = {
  validate: jest.fn(),
};

describe("ValidationPipe", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("when paramtype is body", () => {
    let validationPipe: ValidationPipe;

    beforeEach(() => {
      validationPipe = new ValidationPipe(mockSchema as any, "body");
    });

    it("should validate and return value for body param", () => {
      const input = { foo: "bar" };
      const metadata: ArgumentMetadata = { type: "body" };
      mockSchema.validate.mockReturnValue(input);

      const result = validationPipe.transform(input, metadata);

      expect(mockSchema.validate).toHaveBeenCalledWith(input);
      expect(result).toEqual(input);
    });

    it("should skip validation for non-body param", () => {
      const input = { foo: "bar" };
      const metadata: ArgumentMetadata = { type: "query" };

      const result = validationPipe.transform(input, metadata);

      expect(mockSchema.validate).not.toHaveBeenCalled();
      expect(result).toEqual(input);
    });

    it("should throw ValidationException on validation failure", () => {
      mockSchema.validate.mockImplementation(() => {
        throw new ValidationException();
      });

      const input = { foo: "bar" };
      const metadata: ArgumentMetadata = { type: "body" };

      expect(() => validationPipe.transform(input, metadata)).toThrow(ValidationException);
    });
  });

  describe("when paramtype is query", () => {
    let validationPipe: ValidationPipe;

    beforeEach(() => {
      validationPipe = new ValidationPipe(mockSchema as any, "query");
    });

    it("should validate and return value for query param", () => {
      const input = { search: "test" };
      const metadata: ArgumentMetadata = { type: "query" };
      mockSchema.validate.mockReturnValue(input);

      const result = validationPipe.transform(input, metadata);

      expect(mockSchema.validate).toHaveBeenCalledWith(input);
      expect(result).toEqual(input);
    });

    it("should skip validation for non-query param", () => {
      const input = { search: "test" };
      const metadata: ArgumentMetadata = { type: "param" };

      const result = validationPipe.transform(input, metadata);

      expect(mockSchema.validate).not.toHaveBeenCalled();
      expect(result).toEqual(input);
    });

    it("should throw ValidationException on validation failure", () => {
      mockSchema.validate.mockImplementation(() => {
        throw new ValidationException();
      });

      const input = { search: "test" };
      const metadata: ArgumentMetadata = { type: "query" };

      expect(() => validationPipe.transform(input, metadata)).toThrow(ValidationException);
    });
  });

  describe("when paramtype is param", () => {
    let validationPipe: ValidationPipe;

    beforeEach(() => {
      validationPipe = new ValidationPipe(mockSchema as any, "param");
    });

    it("should validate and return value for route param", () => {
      const input = { id: "123" };
      const metadata: ArgumentMetadata = { type: "param" };
      mockSchema.validate.mockReturnValue(input);

      const result = validationPipe.transform(input, metadata);

      expect(mockSchema.validate).toHaveBeenCalledWith(input);
      expect(result).toEqual(input);
    });

    it("should skip validation for non-param", () => {
      const input = { id: "123" };
      const metadata: ArgumentMetadata = { type: "body" };

      const result = validationPipe.transform(input, metadata);

      expect(mockSchema.validate).not.toHaveBeenCalled();
      expect(result).toEqual(input);
    });

    it("should throw ValidationException on validation failure", () => {
      mockSchema.validate.mockImplementation(() => {
        throw new ValidationException();
      });

      const input = { id: "123" };
      const metadata: ArgumentMetadata = { type: "param" };

      expect(() => validationPipe.transform(input, metadata)).toThrow(ValidationException);
    });
  });
});
