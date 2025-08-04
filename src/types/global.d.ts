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
}

export {};
