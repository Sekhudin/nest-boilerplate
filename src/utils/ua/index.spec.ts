import type { Request } from "express";
import * as helper from "./helper";
import { UserAgent } from "./index";

jest.mock("./helper");

describe("UserAgent", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should create instance and call helper functions with correct arguments", () => {
    const mockReq = {
      headers: { "user-agent": "some user agent" },
      socket: { remoteAddress: "192.168.1.1" },
      ip: "192.168.1.2",
    } as unknown as Request;

    (helper.detectBrowser as jest.Mock).mockReturnValue({ name: "chrome", version: "90" });
    (helper.detectDeviceType as jest.Mock).mockReturnValue("mobile");
    (helper.detectIP as jest.Mock).mockReturnValue("192.168.1.1");
    (helper.detectOS as jest.Mock).mockReturnValue({ name: "windows", version: "10" });

    const ua = UserAgent.parse(mockReq);

    expect(helper.detectBrowser).toHaveBeenCalledWith("some user agent");
    expect(helper.detectDeviceType).toHaveBeenCalledWith("some user agent");
    expect(helper.detectIP).toHaveBeenCalledWith(mockReq);
    expect(helper.detectOS).toHaveBeenCalledWith("some user agent");

    expect(ua.browser).toEqual({ name: "chrome", version: "90" });
    expect(ua.device).toBe("mobile");
    expect(ua.ip).toBe("192.168.1.1");
    expect(ua.os).toEqual({ name: "windows", version: "10" });
    expect(ua.userAgent).toBe("some user agent");
  });

  it("should handle missing user-agent header gracefully", () => {
    const mockReq = {
      headers: {},
      socket: { remoteAddress: "127.0.0.1" },
      ip: "127.0.0.1",
    } as unknown as Request;

    (helper.detectBrowser as jest.Mock).mockReturnValue({ name: "unknown", version: "unknown" });
    (helper.detectDeviceType as jest.Mock).mockReturnValue("desktop");
    (helper.detectIP as jest.Mock).mockReturnValue("127.0.0.1");
    (helper.detectOS as jest.Mock).mockReturnValue({ name: "unknown", version: "unknown" });

    const ua = UserAgent.parse(mockReq);

    expect(ua.userAgent).toBe("");
    expect(ua.browser.name).toBe("unknown");
    expect(ua.device).toBe("desktop");
    expect(ua.ip).toBe("127.0.0.1");
    expect(ua.os.name).toBe("unknown");
  });
});
