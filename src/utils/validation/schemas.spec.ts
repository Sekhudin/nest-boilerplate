import z from "zod/v4";
import { ErrorCode } from "src/shared/enums/error-code.enum";
import * as zr from "./schemas";

describe("Reusable zod schemas", () => {
  it("should normalize username", () => {
    const result = zr.username().safeParse(" FoO ");
    expect(result.success).toBe(true);
    expect(result.data).toBe("foo");
  });

  it("should validate strong password", () => {
    const result = zr.password().safeParse("Strong@123");
    expect(result.success).toBe(true);
    expect(result.data).toBe("Strong@123");
  });

  it("should reject weak password", () => {
    const result = zr.password().safeParse("weakpass");
    expect(result.success).toBe(false);

    if (result.error) {
      expect(z.treeifyError(result.error).errors[0]).toBe(ErrorCode.PASSWORD_WEAK);
    }
  });
});
