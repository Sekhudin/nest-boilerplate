import type { ApiOperationOptions } from "@nestjs/swagger";

export type Docs<T extends string> = Record<T, ApiOperationOptions>;
export type Nullable<T extends unknown> = T | null;
