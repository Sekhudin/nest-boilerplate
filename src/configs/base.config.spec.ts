import * as config from "./base.config";

describe("BaseConfig", () => {
  it("should be defined", () => {
    expect(config).toBeDefined();
  });

  it("should be equal with 'test'", () => {
    expect(config.NODE_ENV).toStrictEqual("test");
  });

  it("should be equal with 'test' as default value", () => {
    expect(config.env(process.env.SOMETHING, "test")).toStrictEqual("test");
  });

  it("should be equal with empty string as default value", () => {
    expect(config.env(process.env.SOMETHING)).toStrictEqual("");
  });

  it("should be truthy", () => {
    expect(config.isMatch(config.NODE_ENV, "test")).toBeTruthy();
    expect(config.isMatch(0, 0)).toBeTruthy();
    expect(config.isMatch({}, {})).toBeTruthy();
    expect(config.isMatch("", "")).toBeTruthy();
    expect(config.isMatch(true, true)).toBeTruthy();
  });

  it("should be falsy", () => {
    expect(config.isMatch(config.NODE_ENV, "foo")).toBeFalsy();
    expect(config.isMatch(0, 1)).toBeFalsy();
    expect(config.isMatch({}, { value: 0 })).toBeFalsy();
    expect(config.isMatch("", "foo")).toBeFalsy();
    expect(config.isMatch(true, false)).toBeFalsy();
  });

  it("should be falsy", () => {
    expect(config.isProduction()).toBeFalsy();
  });

  it("should be truthy", () => {
    expect(config.isMatch(config.split("a,b,c"), ["a", "b", "c"])).toBeTruthy();
    expect(config.isMatch(config.split("a ,b ,c "), ["a", "b", "c"])).toBeTruthy();
    expect(config.isMatch(config.split(""), [])).toBeTruthy();
  });
});
