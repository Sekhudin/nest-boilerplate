import { UsePipes } from "@nestjs/common";
import { ValidationPipe } from "src/shared/pipes/validation.pipe";
import { Validate } from "./validate.decorator";

jest.mock("@nestjs/common", () => ({
  ...jest.requireActual("@nestjs/common"),
  UsePipes: jest.fn(),
}));

describe("Validate decorator", () => {
  it("should apply ValidationPipe with correct schema and paramtype", () => {
    const mockSchema = {
      schema: { foo: "bar" },
    } as any;
    const mockParamtype = "body";

    Validate(mockSchema, mockParamtype);

    expect(UsePipes).toHaveBeenCalledWith(expect.any(ValidationPipe));
    const pipeInstance = (UsePipes as jest.Mock).mock.calls[0][0];
    expect(pipeInstance.schema).toBe(mockSchema.schema);
    expect(pipeInstance.paramtype).toBe(mockParamtype);
  });
});
