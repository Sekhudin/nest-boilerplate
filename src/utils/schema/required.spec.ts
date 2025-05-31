import { email, string, username } from "./required";

describe("Reusable zod schemas", () => {
  it("should validate non-empty string", () => {
    const result = string("name").safeParse(" John ");
    expect(result.success).toBe(true);
    expect(result.data).toBe("John");
  });

  it("should return custom error for empty string", () => {
    const result = string("username").safeParse("   ");
    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toBe("username can't be empty");
  });

  it("should validate and normalize email", () => {
    const result = email().safeParse(" USER@EXAMPLE.com ");
    expect(result.success).toBe(true);
    expect(result.data).toBe("user@example.com");
  });

  it("should fail on invalid email", () => {
    const result = email().safeParse("not-an-email");
    expect(result.success).toBe(false);
  });

  it("should normalize username", () => {
    const result = username().safeParse(" FoO ");
    expect(result.success).toBe(true);
    expect(result.data).toBe("foo");
  });
});
