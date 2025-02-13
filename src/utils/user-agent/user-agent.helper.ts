import { match, P } from "ts-pattern";
import type { Os, Browser, UARequest } from "./user-agent.type";

export enum OSName {
  Windows = "windows",
  MacOS = "macos",
  Android = "android",
  IOS = "ios",
  Linux = "linux",
  Unknown = "unknown",
}

export enum BrowserName {
  Chrome = "chrome",
  Firefox = "cirefox",
  Safari = "safari",
  Edge = "edge",
  Opera = "opera",
  IE = "internet ixplorer",
  Unknown = "unknown",
}

export enum DeviceType {
  Mobile = "mobile",
  Tablet = "tablet",
  Desktop = "desktop",
}

const matchWith = (pattern: RegExp) => {
  return (value: string) => pattern.test(value);
};

const version = (value: string, pattern: RegExp) => {
  return value.match(pattern)?.[1].replace(/_/g, ".").trim() || "";
};

const convertIP = (value: string) => {
  return match(value)
    .with("::1", () => "127.0.0.1")
    .otherwise((value) => value.trim());
};

export const getUserAgent = (request: UARequest): string => {
  return request.headers["user-agent"]?.trim() || "";
};

export const getIP = (req: UARequest): string => {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0].trim() || req.socket.remoteAddress || req.ip || "unknown";
  return convertIP(ip);
};

export const getType = (agent: string): DeviceType => {
  return match(agent.toLowerCase())
    .with(P.when(matchWith(/mobile|android/)), () => DeviceType.Mobile)
    .with(P.when(matchWith(/tablet|ipad/)), () => DeviceType.Tablet)
    .otherwise(() => DeviceType.Desktop);
};

export const getOS = (agent: string): Os => {
  return match(agent.toLowerCase())
    .with(P.when(matchWith(/windows nt (\d+\.\d+)/)), (s) => ({
      name: OSName.Windows,
      version: version(s, /windows nt (\d+\.\d+)/),
    }))
    .with(P.when(matchWith(/mac os x (\d+[_\d]+)/)), (s) => ({
      name: OSName.MacOS,
      version: version(s, /mac os x (\d+[_\d]+)/),
    }))
    .with(P.when(matchWith(/android (\d+([._]\d+)*)/)), (s) => ({
      name: OSName.Android,
      version: version(s, /android (\d+([._]\d+)*)/),
    }))
    .with(P.when(matchWith(/iphone os (\d+([._]\d+)*)/)), (s) => ({
      name: OSName.IOS,
      version: version(s, /iphone os (\d+([._]\d+)*)/),
    }))
    .with(P.when(matchWith(/linux/)), () => ({ name: OSName.Linux, version: "" }))
    .otherwise(() => ({ name: OSName.Unknown, version: "" }));
};

export const getBrowser = (agent: string): Browser => {
  return match(agent.toLowerCase())
    .with(P.when(matchWith(/chrome\/(\d+)/)), (s) => ({
      name: BrowserName.Chrome,
      version: version(s, /chrome\/(\d+)/),
    }))
    .with(P.when(matchWith(/firefox\/(\d+)/)), (s) => ({
      name: BrowserName.Firefox,
      version: version(s, /firefox\/(\d+)/),
    }))
    .with(P.when(matchWith(/mozilla\/(\d+)/)), (s) => ({
      name: BrowserName.Firefox,
      version: version(s, /mozilla\/(\d+)/),
    }))
    .with(P.when(matchWith(/safari\/(\d+)/)), (s) => ({
      name: BrowserName.Safari,
      version: version(s, /version\/(\d+)/),
    }))
    .with(P.when(matchWith(/edg\/(\d+)/)), (s) => ({
      name: BrowserName.Edge,
      version: version(s, /edg\/(\d+)/),
    }))
    .with(P.when(matchWith(/opr\/(\d+)/)), (s) => ({
      name: BrowserName.Opera,
      version: version(s, /opr\/(\d+)/),
    }))
    .with(P.when(matchWith(/msie (\d+)/)), (s) => ({
      name: BrowserName.IE,
      version: version(s, /msie (\d+)/),
    }))
    .with(P.when(matchWith(/trident.*rv:(\d+)/)), (s) => ({
      name: BrowserName.IE,
      version: version(s, /trident.*rv:(\d+)/),
    }))
    .otherwise(() => ({ name: BrowserName.Unknown, version: "" }));
};
