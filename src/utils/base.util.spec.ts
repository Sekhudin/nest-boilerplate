import * as base from "./base.util";

describe("baseUtil", () => {
  describe("isMatch", () => {
    it("toBeTruthy", () => {
      expect(base.isMatch(undefined, undefined)).toBeTruthy();
      expect(base.isMatch(null, null)).toBeTruthy();
      expect(base.isMatch(1, 1)).toBeTruthy();
      expect(base.isMatch("", "")).toBeTruthy();
      expect(base.isMatch({}, {})).toBeTruthy();
      expect(base.isMatch({ name: "john" }, { name: "john" })).toBeTruthy();
    });

    it("toBeTruthy", () => {
      expect(base.isMatch(undefined, null)).toBeFalsy();
      expect(base.isMatch(null, undefined)).toBeFalsy();
      expect(base.isMatch(1, 0)).toBeFalsy();
      expect(base.isMatch("", "jhn")).toBeFalsy();
      expect(base.isMatch({}, null)).toBeFalsy();
      expect(base.isMatch({ name: "john" }, { name: "doe" })).toBeFalsy();
    });
  });
});
