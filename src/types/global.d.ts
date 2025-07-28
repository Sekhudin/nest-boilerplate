declare global {
  interface Callback {
    (): void;
    (value: unknown): void;
  }

  type AsyncStorageKey = "req" | "res" | "requestStartTime";
  type AsyncStorageStore = Map<AsyncStorageKey, unknown>;

  interface AuthenticationToken {
    refreshToken: string;
    accessToken: string;
  }

  type MetaPayload = Record<string, string | number | boolean | null | undefined>;

  interface OptionalMetadata {
    pagination?: MetaPayload;
    filters?: MetaPayload;
    sort?: Record<"field" | "direction", string>;
  }

  interface Metadata extends OptionalMetadata {
    requestId: string;
    executionTime: string | null;
    timestamp: string;
  }
}

export {};
