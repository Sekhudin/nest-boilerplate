import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthProviderService } from "./auth-provider.service";
import { AuthProviderController } from "./auth-provider.controller";
import { AuthProviderRepository } from "./auth-provider.repository";
import { AuthProvider } from "./entities/auth-provider.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AuthProvider])],
  controllers: [AuthProviderController],
  providers: [AuthProviderService, AuthProviderRepository],
  exports: [AuthProviderService],
})
export class AuthProviderModule {}
