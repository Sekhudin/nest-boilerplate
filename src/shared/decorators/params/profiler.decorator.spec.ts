import { mockRequest } from "src/shared/testing/mocks";
import { getDecoratorParamsFactory } from "src/shared/testing/common";
import { BrowserName, OSName, DeviceType } from "src/utils/user-agent/user-agent.helper";
import { Profiler, ProfilerValue } from "./profiler.decorator";

describe("profiler", () => {
  describe("use decorator", () => {
    it("each properties are match", () => {
      const agent = getDecoratorParamsFactory<ProfilerValue>(mockRequest, Profiler);
      expect(agent.userAgent).toBeDefined();
      expect(agent.ip).toBe("203.0.113.42");
      expect(agent.type).toBe(DeviceType.Desktop);
      expect(agent.os).toStrictEqual({ name: OSName.Windows, version: "10.0" });
      expect(agent.browser).toStrictEqual({ name: BrowserName.Firefox, version: "5" });
    });
  });
});
