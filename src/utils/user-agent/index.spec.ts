import { UAParser } from "./index";
import { BrowserName, OSName, DeviceType } from "./user-agent.helper";
import type { UARequest } from "./user-agent.type";

describe("UAParser", () => {
  let request: UARequest;

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
  });

  describe("parse", () => {
    it("should be defined", () => {
      const agent = UAParser.parse(request);
      expect(agent).toBeDefined();
    });

    it("each properties are match", () => {
      const agent = UAParser.parse(request);
      expect(agent.userAgent).toBeDefined();
      expect(agent.ip).toBe("203.0.113.42");
      expect(agent.type).toBe(DeviceType.Desktop);
      expect(agent.os).toStrictEqual({ name: OSName.Windows, version: "10.0" });
      expect(agent.browser).toStrictEqual({ name: BrowserName.Firefox, version: "5" });
    });
  });
});
