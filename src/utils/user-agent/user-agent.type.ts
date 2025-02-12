export type Os = Record<"name" | "version", string>;
export type Browser = Record<"name" | "version", string>;

export type UARequest = {
  ip?: string;
  headers: {
    "x-forwarded-for"?: string;
    "user-agent"?: string;
  };
  socket: {
    remoteAddress?: string;
  };
};

export interface UAParserResult {
  userAgent: string;
  ip?: string;
  type: string;
  os: Os;
  browser: Browser;
}
