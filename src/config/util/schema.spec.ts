import * as schema from "./schema";

describe("environment schema utilities", () => {
  it("should validate non-empty trimmed string", () => {
    const s = schema.string("name");
    expect(() => s.parse("  valid  ")).not.toThrow();
    expect(() => s.parse("   ")).toThrow("name can't be empty");

    const defaultString = schema.string();
    expect(() => defaultString.parse("")).toThrow("field can't be empty");
  });

  it("should split comma-separated values", () => {
    const s = schema.split();
    expect(s.parse("a,b, c ")).toEqual(["a", "b", "c"]);

    expect(() => s.parse("")).toThrow();
  });

  it("should validate mode enum", () => {
    expect(schema.mode().parse("production")).toBe("production");
    expect(() => schema.mode().parse("invalid")).toThrow();
  });

  it("should validate locale enum", () => {
    expect(schema.locale().parse("en-US")).toBe("en-US");
    expect(() => schema.locale().parse("xx")).toThrow();
  });

  it("should validate database enum", () => {
    expect(schema.database().parse("postgres")).toBe("postgres");
  });

  it("should validate path starts with /", () => {
    expect(schema.path().parse("/home")).toBe("/home");
    expect(() => schema.path().parse("home")).toThrow();
  });

  it("should validate timezone enum", () => {
    expect(schema.timezone().parse("Asia/Jakarta")).toBe("Asia/Jakarta");
  });

  it("should validate log level", () => {
    expect(schema.loglevel().parse("info")).toBe("info");
  });

  it("should validate log format", () => {
    expect(schema.logformat().parse("json")).toBe("json");
  });

  it("should validate algorithm", () => {
    expect(schema.algorithm().parse("HS256")).toBe("HS256");
  });

  it("should validate encrypt algorithm", () => {
    expect(schema.encryptalgo().parse("aes-256-gcm")).toBe("aes-256-gcm");
  });

  it("should validate expirein values", () => {
    expect(schema.expirein().parse("15m")).toBe("15m");
  });

  it("should validate priority enum", () => {
    expect(schema.priority().parse("high")).toBe("high");
  });

  it("should validate boolean enum and transform to boolean", () => {
    expect(schema.boolean().parse("true")).toBe(true);
    expect(schema.boolean().parse("false")).toBe(false);

    expect(() => schema.boolean().parse("yes" as any)).toThrow();
  });

  it("should transform string to number", () => {
    expect(schema.number().parse("123")).toBe(123);
    expect(schema.number().parse("abc")).toBeNaN();
  });

  it("should transform string to milliseconds", () => {
    expect(schema.milliseconds().parse("5m")).toBe(300000);
    expect(schema.milliseconds().parse("invalid" as any)).toBeUndefined();
  });

  it("should transform string to bytes", () => {
    expect(schema.bytes().parse("2kb")).toBe(2048);
    expect(schema.bytes().parse("invalid")).toBe(1024); // fallback
  });

  it("should validate samesite enum", () => {
    expect(schema.samesite().parse("lax")).toBe("lax");
  });

  it("should validate secret with min length", () => {
    expect(schema.secret("password", 6).parse("123456")).toBe("123456");
    expect(() => schema.secret("password", 6).parse("123")).toThrow("password must be at least 6 characters long");

    expect(() => schema.secret("apiKey", 8).parse("      ")).toThrow("apiKey must be at least 8 characters long");
  });

  it("should validate semver format", () => {
    expect(schema.semver("version").parse("1.0.0")).toBe("1.0.0");
    expect(() => schema.semver("version").parse("1.0")).toThrow("version must be valid semver (e.g., 1.0.0)");

    expect(() => schema.semver().parse("0")).toThrow("field must be valid semver (e.g., 1.0.0)");
  });
});
