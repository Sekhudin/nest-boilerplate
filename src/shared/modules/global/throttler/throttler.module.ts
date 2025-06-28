import { Module } from "@nestjs/common";
import { ThrottlerModule as NestThrottlerModule } from "@nestjs/throttler";
import { throttlerConfig } from "src/config/throttler.config";

@Module({
  imports: [NestThrottlerModule.forRoot(throttlerConfig.options)],
  exports: [NestThrottlerModule],
})
export class ThrottlerModule {}
