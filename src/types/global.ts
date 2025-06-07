import { Request, Response } from "express";
import type { ApiOperationOptions } from "@nestjs/swagger";
import type { StandardSchemaV1 } from "@standard-schema/spec";

export type Docs<T extends string> = Record<T, ApiOperationOptions>;
export type Dto<Schema extends StandardSchemaV1> = StandardSchemaV1.InferInput<Schema>;

export type Nullable<T extends unknown> = T | null;

export interface RequestWithRes extends Request {
  res: Response;
}
export type ExpressMiddleware = (req: Request, res: Response, next: () => void) => void;
