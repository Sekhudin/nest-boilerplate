import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthProvider } from "./entities/auth-provider.entity";
import { AuthProviderRepository } from "./auth-provider.repository";
import { AuthProviderService } from "./auth-provider.service";

@Module({
  imports: [TypeOrmModule.forFeature([AuthProvider])],
  providers: [AuthProviderService, AuthProviderRepository],
  exports: [AuthProviderService],
})
export class AuthProviderModule {}
