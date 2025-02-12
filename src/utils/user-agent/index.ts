import * as UserAgent from "./user-agent.helper";
import type { UARequest, Os, Browser, UAParserResult } from "./user-agent.type";

export class UAParser implements UAParserResult {
  userAgent: string;
  ip: string;
  type: string;
  os: Os;
  browser: Browser;

  constructor(req: UARequest) {
    const userAgent = UserAgent.getUserAgent(req);
    this.userAgent = userAgent;
    this.ip = UserAgent.getIP(req);
    this.type = UserAgent.getType(userAgent);
    this.os = UserAgent.getOS(userAgent);
    this.browser = UserAgent.getBrowser(userAgent);
  }

  public static parse(req: UARequest) {
    return new UAParser(req);
  }
}

export { UserAgent };
export type { UARequest, UAParserResult };
