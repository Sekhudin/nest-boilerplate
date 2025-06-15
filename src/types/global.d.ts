declare global {
  interface Callback {
    (): void;
    (value: unknown): void;
  }

  type AsyncStorageKey = "req" | "res";
  type AsyncStorageStore = Map<AsyncStorageKey, unknown>;
}

export {};
