import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserAuth } from "./entities/user-auth.entity";
import { UserAuthRepository } from "./user-auth.repository";
import { UserAuthService } from "./user-auth.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserAuth])],
  providers: [UserAuthService, UserAuthRepository],
  exports: [UserAuthService],
})
export class UserAuthModule {}
