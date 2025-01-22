import { Module } from "@nestjs/common";
import { LoggerService } from "src/shared/services/logger.service";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, LoggerService],
  exports: [LoggerService],
})
export class AppModule {}
