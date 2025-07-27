import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthHistory } from "./entities/auth-history.entity";
import { AuthHistoryRepository } from "./auth-history.repository";
import { AuthHistoryService } from "./auth-history.service";

@Module({
  imports: [TypeOrmModule.forFeature([AuthHistory])],
  providers: [AuthHistoryService, AuthHistoryRepository],
  exports: [AuthHistoryService],
})
export class AuthHistoryModule {}
