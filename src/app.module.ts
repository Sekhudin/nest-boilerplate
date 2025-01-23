import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";
import { LoggerService } from "src/shared/services/logger.service";

@Module({
  imports: [AuthModule, UserModule],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class AppModule {}
