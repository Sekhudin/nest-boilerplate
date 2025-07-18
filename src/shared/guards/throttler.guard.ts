import { Injectable } from "@nestjs/common";
import { ThrottlerGuard as NestThrottlerGuard } from "@nestjs/throttler";
import { ThrottlerTooManyRequestsException } from "src/shared/exceptions/throttler/throttler-too-many-requests.exception";

@Injectable()
export class ThrottlerGuard extends NestThrottlerGuard {
  protected throwThrottlingException(): Promise<void> {
    throw new ThrottlerTooManyRequestsException();
  }
}
