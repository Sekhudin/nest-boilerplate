import { AsyncLocalStorage } from "async_hooks";
import { Request, Response } from "express";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AsyncStorageService {
  private readonly asyncStorage = new AsyncLocalStorage<AsyncStorageStore>();

  private get store() {
    return this.asyncStorage.getStore() ?? null;
  }

  run(store: AsyncStorageStore, cb: Callback) {
    this.asyncStorage.run(store, cb);
  }

  set<T>(key: AsyncStorageKey, value: T) {
    this.store?.set(key, value);
  }

  get<T>(key: AsyncStorageKey) {
    return (this.store?.get(key) as T) ?? null;
  }

  setRequest(req: Request) {
    this.set("req", req);
  }

  getRequest() {
    return this.get<Request>("req");
  }

  setResponse(res: Response) {
    this.set("res", res);
  }

  getResponse() {
    return this.get<Response>("res");
  }
}
