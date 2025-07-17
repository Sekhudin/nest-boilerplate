import { isMatchRegex, isNotMatchRegex } from "./index";

describe("utils", () => {
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
