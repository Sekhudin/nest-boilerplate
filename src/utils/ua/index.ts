import type { Request } from "express";
import { detectBrowser, detectDeviceType, detectIP, detectOS } from "./helper";

export class UserAgent {
  public readonly userAgent: string;
  public readonly browser: ReturnType<typeof detectBrowser>;
  public readonly device: string;
  public readonly ip: string;
  public readonly os: ReturnType<typeof detectOS>;

  constructor(req: Request) {
    this.userAgent = req.headers["user-agent"] || "";
    this.browser = detectBrowser(this.userAgent);
    this.device = detectDeviceType(this.userAgent);
    this.ip = detectIP(req);
    this.os = detectOS(this.userAgent);
  }

  static getInstance(req: Request) {
    return new UserAgent(req);
  }
}
