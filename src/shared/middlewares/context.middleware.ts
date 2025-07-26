import { randomUUID } from "crypto";
import { NextFunction, Request, Response } from "express";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { AsyncStorageService } from "src/shared/modules/global/context/async-storage.service";
import { CookieService } from "src/shared/modules/global/context/cookie.service";
import { UserAgent } from "src/utils/ua";

@Injectable()
export class ContextMiddleware implements NestMiddleware<Request, Response> {
  constructor(
    private readonly asyncStorageService: AsyncStorageService,
    private readonly cookie: CookieService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const store = new Map<AsyncStorageKey, unknown>();
    store.set("req", req);
    store.set("res", res);
    store.set("requestStartTime", Date.now());

    this.asyncStorageService.run(store, () => {
      const userAgent = UserAgent.parse(req);
      const deviceId = this.cookie.getDeviceId();
      req.requestId = randomUUID();
      req.deviceId = deviceId || null;
      req.userAgent = userAgent;
      this.cookie.setDeviceId();
      next();
    });
  }
}
