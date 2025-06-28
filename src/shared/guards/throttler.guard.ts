import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ThrottlerGuard as NestThrottlerGuard } from "@nestjs/throttler";

@Injectable()
export class ThrottlerGuard extends NestThrottlerGuard {
  protected throwThrottlingException(): Promise<void> {
    throw new HttpException(
      {
        message: "Too Many Requests",
        error: "Too Many Requests",
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
      },
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }
}
