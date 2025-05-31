import { isMatch, isMatchRegex, isNotMatch, isNotMatchRegex } from "./index";

describe("utils", () => {
  describe("isMatch", () => {
    it("should return true for matching pattern", () => {
      expect(isMatch({ a: 1 }, { a: 1 })).toBe(true);
    });

    it("should return false for non-matching pattern", () => {
      expect(isMatch({ a: 1 }, { a: 2 })).toBe(false);
    });
  });

  describe("isNotMatch", () => {
    it("should return true for non-matching pattern", () => {
      expect(isNotMatch({ a: 1 }, { a: 2 })).toBe(true);
    });

    it("should return false for matching pattern", () => {
      expect(isNotMatch({ a: 1 }, { a: 1 })).toBe(false);
    });
  });

  describe("isMatchRegex", () => {
    it("should return true if regex matches", () => {
      expect(isMatchRegex(/abc/, "abcde")).toBe(true);
    });

    it("should return false if regex does not match", () => {
      expect(isMatchRegex(/xyz/, "abcde")).toBe(false);
    });
  });

  describe("isNotMatchRegex", () => {
    it("should return true if regex does not match", () => {
      expect(isNotMatchRegex(/xyz/, "abcde")).toBe(true);
    });

    it("should return false if regex matches", () => {
      expect(isNotMatchRegex(/abc/, "abcde")).toBe(false);
    });
  });
});
