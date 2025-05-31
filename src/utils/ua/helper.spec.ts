import type { Request } from "express";
import { detectBrowser, detectDeviceType, detectIP, detectOS } from "./helper";

jest.mock("src/utils", () => ({
  isMatchRegex: (pattern: RegExp, value: string) => pattern.test(value),
}));

describe("helper functions", () => {
  describe("detectIP", () => {
    it("should return first IP from x-forwarded-for header", () => {
      const req = {
        headers: { "x-forwarded-for": "1.2.3.4, 5.6.7.8" },
        forwarded: undefined,
        socket: { remoteAddress: "9.10.11.12" },
        ip: "13.14.15.16",
      } as unknown as Request;

      expect(detectIP(req)).toBe("1.2.3.4");
    });

    it("should return IP from forwarded header", () => {
      const req = {
        headers: { forwarded: "for=2.3.4.5;proto=http" },
        socket: { remoteAddress: "9.10.11.12" },
        ip: "13.14.15.16",
      } as unknown as Request;

      expect(detectIP(req)).toBe("2.3.4.5");
    });

    it("should return socket remoteAddress if no headers", () => {
      const req = {
        headers: {},
        socket: { remoteAddress: "::ffff:192.168.0.1" },
        ip: "13.14.15.16",
      } as unknown as Request;

      expect(detectIP(req)).toBe("192.168.0.1");
    });

    it("should return ip property if no other sources", () => {
      const req = {
        headers: {},
        socket: { remoteAddress: undefined },
        ip: "13.14.15.16",
      } as unknown as Request;

      expect(detectIP(req)).toBe("13.14.15.16");
    });

    it("should convert ::1 to 127.0.0.1", () => {
      const req = {
        headers: {},
        socket: { remoteAddress: "::1" },
        ip: "13.14.15.16",
      } as unknown as Request;

      expect(detectIP(req)).toBe("127.0.0.1");
    });
  });

  describe("detectDeviceType", () => {
    it("should detect tablet", () => {
      expect(detectDeviceType("Mozilla/5.0 (iPad; CPU OS 13_4_1)")).toBe("tablet");
    });

    it("should detect mobile", () => {
      expect(detectDeviceType("Mozilla/5.0 (iPhone; CPU iPhone OS 14_0)")).toBe("mobile");
      expect(detectDeviceType("Mozilla/5.0 (Android 10)")).toBe("mobile");
    });

    it("should detect desktop", () => {
      expect(detectDeviceType("Mozilla/5.0 (Windows NT 10.0)")).toBe("desktop");
    });
  });

  describe("detectOS", () => {
    it("should detect windows with version", () => {
      expect(detectOS("windows nt 10.0")).toEqual({ name: "windows", version: "10.0" });
    });

    it("should detect macos with version", () => {
      expect(detectOS("mac os x 10_15_7")).toEqual({ name: "macos", version: "10.15.7" });
    });

    it("should detect android with version", () => {
      expect(detectOS("android 9.1")).toEqual({ name: "android", version: "9.1" });
    });

    it("should detect ios with version", () => {
      expect(detectOS("iphone os 14_4")).toEqual({ name: "ios", version: "14.4" });
    });

    it("should detect linux", () => {
      expect(detectOS("linux")).toEqual({ name: "linux", version: "unknown" });
    });

    it("should return unknown for unmatched os", () => {
      expect(detectOS("some unknown os")).toEqual({ name: "unknown", version: "unknown" });
    });
  });

  describe("detectBrowser", () => {
    it("should detect chrome with version", () => {
      expect(detectBrowser("chrome/89")).toEqual({ name: "chrome", version: "89" });
    });

    it("should detect firefox with version", () => {
      expect(detectBrowser("firefox/78")).toEqual({ name: "firefox", version: "78" });
    });

    it("should detect safari with version", () => {
      expect(detectBrowser("safari/537")).toEqual({ name: "safari", version: "537" });
    });

    it("should detect edge with version", () => {
      expect(detectBrowser("edg/91")).toEqual({ name: "edge", version: "91" });
    });

    it("should detect opera with version", () => {
      expect(detectBrowser("opr/76")).toEqual({ name: "opera", version: "76" });
    });

    it("should detect internet explorer with version", () => {
      expect(detectBrowser("msie 10")).toEqual({ name: "internet explorer", version: "10" });
    });

    it("should return unknown for unmatched browser", () => {
      expect(detectBrowser("some unknown browser")).toEqual({ name: "unknown", version: "unknown" });
    });
  });
});
