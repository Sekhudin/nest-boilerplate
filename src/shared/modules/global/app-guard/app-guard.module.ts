import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard } from "src/shared/guards/throttler.guard";

@Module({ providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }] })
export class AppGuardModule {}
