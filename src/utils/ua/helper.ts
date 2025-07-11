import type { Request } from "express";
import { match } from "ts-pattern";
import { isMatchRegex } from "src/utils";

export const DEVICE = {
  tablet: {
    name: "tablet",
    pattern: /tablet|ipad/,
  },
  mobile: {
    name: "mobile",
    pattern: /mobile|iphone|android/,
  },
  desktop: {
    name: "desktop",
    pattern: /windows nt|mac os x|x11|linux/,
  },
} as const;

export const OS = {
  windows: {
    name: "windows",
    pattern: /windows nt (\d+\.\d+)/,
  },
  mac: {
    name: "macos",
    pattern: /mac os x (\d+[_\d]+)/,
  },
  android: {
    name: "android",
    pattern: /android (\d+([._]\d+)*)/,
  },
  ios: {
    name: "ios",
    pattern: /iphone os (\d+([._]\d+)*)/,
  },
  linux: {
    name: "linux",
    pattern: /linux/,
  },
} as const;

export const BROWSER = {
  chrome: {
    name: "chrome",
    pattern: /chrome\/(\d+)*/,
  },
  firefox: {
    name: "firefox",
    pattern: /firefox\/(\d+)*/,
  },
  safari: {
    name: "safari",
    pattern: /safari\/(\d+)*/,
  },
  edge: {
    name: "edge",
    pattern: /edg\/(\d+)*/,
  },
  opera: {
    name: "opera",
    pattern: /opr\/(\d+)*/,
  },
  ie: {
    name: "internet explorer",
    pattern: /msie (\d+)*/,
  },
} as const;

const whenMatch = (pattern: RegExp) => {
  return (value: string) => isMatchRegex(pattern, value.toLowerCase().trim());
};

const extractVersion = (pattern: RegExp, value: string) => {
  const fallback = /version\/(\d+(?:[._]\d+)*)/i;
  const tryMatch = (pattern: RegExp): string | null => {
    const match = value.match(pattern);
    if (!match) return null;

    const version = match.slice(1).find(Boolean);
    return version?.replace(/_/g, ".").trim() || null;
  };
  return tryMatch(pattern) || tryMatch(fallback) || "unknown";
};

const extractFor = ({ name, pattern }: { name: string; pattern: RegExp }) => {
  return (value: string) => ({ name, version: extractVersion(pattern, value.toLowerCase().trim()) });
};

export const detectIP = ({ ip, headers, socket }: Request) => {
  const xForwardedFor = headers["x-forwarded-for"] as string | undefined;
  const forwardedFor = xForwardedFor?.split(",")[0]?.trim();
  const forwardedIP = headers.forwarded?.match(/for=(?<ip>[^\s;]+)/)?.groups?.ip;

  const rawIP = forwardedFor || forwardedIP || socket.remoteAddress || ip || "unknown";
  if (rawIP === "::1") return "127.0.0.1";
  return rawIP.replace(/^::ffff:/, "").trim();
};

export const detectDeviceType = (value: string) => {
  return match(value)
    .when(whenMatch(DEVICE.tablet.pattern), () => DEVICE.tablet.name)
    .when(whenMatch(DEVICE.mobile.pattern), () => DEVICE.mobile.name)
    .otherwise(() => DEVICE.desktop.name);
};

export const detectOS = (value: string) => {
  return match(value)
    .when(whenMatch(OS.windows.pattern), extractFor(OS.windows))
    .when(whenMatch(OS.mac.pattern), extractFor(OS.mac))
    .when(whenMatch(OS.linux.pattern), extractFor(OS.linux))
    .when(whenMatch(OS.android.pattern), extractFor(OS.android))
    .when(whenMatch(OS.ios.pattern), extractFor(OS.ios))
    .otherwise(() => ({ name: "unknown", version: "unknown" }));
};

export const detectBrowser = (value: string) => {
  return match(value)
    .when(whenMatch(BROWSER.chrome.pattern), extractFor(BROWSER.chrome))
    .when(whenMatch(BROWSER.firefox.pattern), extractFor(BROWSER.firefox))
    .when(whenMatch(BROWSER.safari.pattern), extractFor(BROWSER.safari))
    .when(whenMatch(BROWSER.edge.pattern), extractFor(BROWSER.edge))
    .when(whenMatch(BROWSER.opera.pattern), extractFor(BROWSER.opera))
    .when(whenMatch(BROWSER.ie.pattern), extractFor(BROWSER.ie))
    .otherwise(() => ({ name: "unknown", version: "unknown" }));
};
