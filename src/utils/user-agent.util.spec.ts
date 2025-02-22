import { mockRequest } from "src/shared/testing/mocks";
import { UAParser } from "./user-agent.util";
import { BrowserName, OSName, DeviceType } from "./user-agent/user-agent.helper";

describe("UAParser", () => {
  describe("parse", () => {
    it("should be defined", () => {
      const agent = UAParser.parse(mockRequest.switchToHttp().getRequest());
      expect(agent).toBeDefined();
    });

    it("each properties are match", () => {
      const agent = UAParser.parse(mockRequest.switchToHttp().getRequest());
      expect(agent.userAgent).toBeDefined();
      expect(agent.ip).toBe("203.0.113.42");
      expect(agent.type).toBe(DeviceType.Desktop);
      expect(agent.os).toStrictEqual({ name: OSName.Windows, version: "10.0" });
      expect(agent.browser).toStrictEqual({ name: BrowserName.Firefox, version: "5" });
    });
  });
});
