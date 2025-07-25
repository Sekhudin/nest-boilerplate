declare global {
  interface Callback {
    (): void;
    (value: unknown): void;
  }

  type AsyncStorageKey = "req" | "res" | "executionTime";
  type AsyncStorageStore = Map<AsyncStorageKey, unknown>;

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
