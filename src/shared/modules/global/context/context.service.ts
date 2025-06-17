import { Injectable } from "@nestjs/common";
import { AsyncStorageService } from "./async-storage.service";

@Injectable()
export class ContextService {
  constructor(private readonly asyncStorageService: AsyncStorageService) {}

  private get req() {
    return this.asyncStorageService.getRequest();
  }

  getRequestId() {
    return this.req.requestId;
  }

  getDeviceId() {
    return this.req.deviceId;
  }

  getUserAgent() {
    return this.req.userAgent;
  }

  getUser() {
    return this.req.user || null;
  }
}
