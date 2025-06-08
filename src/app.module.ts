import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { LoggerModule } from "./shared/modules/logger.module";

@Module({
  imports: [LoggerModule, AuthModule],
  providers: [],
  exports: [],
})
export class AppModule {}
