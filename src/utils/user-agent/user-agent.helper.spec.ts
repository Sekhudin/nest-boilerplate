import * as UserAgent from "./user-agent.helper";
import type { UARequest } from "./user-agent.type";

describe("userAgentHelper", () => {
  let request: UARequest;
  let userAgent: string;

  beforeEach(() => {
    request = {
      ip: "192.168.1.1",
      headers: {
        "x-forwarded-for": "203.0.113.42, 198.51.100.23, 192.0.2.10",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
      socket: {
        remoteAddress: "192.168.1.100",
      },
    };

    userAgent = UserAgent.getUserAgent(request);
  });

  describe("getUserAgent", () => {
    it("return user-agent string", () => {
      const userAgent = UserAgent.getUserAgent(request);
      expect(userAgent).toEqual("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
    });

    it("return user-agent empty string", () => {
      const userAgent = UserAgent.getUserAgent({ ...request, headers: {} });
      expect(userAgent).toEqual("");
    });
  });

  describe("getIP", () => {
    it("return true Client IP", () => {
      const ip = UserAgent.getIP(request);
      expect(ip).toEqual("203.0.113.42");
    });

    it("convert ::1 to IPV4", () => {
      const ip = UserAgent.getIP({ ...request, ip: "::1", headers: {}, socket: {} });
      expect(ip).toEqual("127.0.0.1");
    });
  });

  describe("getType", () => {
    it("return client device type", () => {
      const deviceType = UserAgent.getType(userAgent);
      expect(deviceType).toEqual(UserAgent.DeviceType.Desktop);
    });
  });

  describe("getBrowser", () => {
    it("return browser type", () => {
      const browser = UserAgent.getBrowser(userAgent);
      expect(browser).toBeDefined();
      expect(browser.name).toBe(UserAgent.BrowserName.Firefox);
      expect(browser.version).toBe("5");
    });
  });

  describe("getOS", () => {
    it("return client os", () => {
      const browser = UserAgent.getOS(userAgent);
      expect(browser).toBeDefined();
      expect(browser.name).toBe(UserAgent.OSName.Windows);
      expect(browser.version).toBe("10.0");
    });
  });
});
