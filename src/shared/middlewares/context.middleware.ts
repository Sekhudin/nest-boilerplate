import { Next, Request, Response } from "express";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { AsyncStorageService } from "src/shared/modules/global/context/async-storage.service";

@Injectable()
export class ContextMiddleware implements NestMiddleware<Request, Response> {
  constructor(private readonly asyncStorageService: AsyncStorageService) {}

  use(req: Request, res: Response, next: Next) {
    const store = new Map<AsyncStorageKey, unknown>();
    store.set("req", req);
    store.set("res", res);
    this.asyncStorageService.run(store, next);
  }
}
