import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleModule } from "src/modules/role/role.module";
import { TokenModule } from "src/modules/token/token.module";
import { UserModule } from "src/modules/user/user.module";
import { JwtTokenModule } from "src/shared/modules/feature/jwt-token/jwt-token.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthHistory } from "./entities/auth-history.entity";
import { AuthProvider } from "./entities/auth-provider.entity";
import { UserAuth } from "./entities/user-auth.entity";
import { AuthHistoryRepository } from "./repositories/auth-history.repository";
import { AuthProviderRepository } from "./repositories/auth-provider.repository";
import { UserAuthRepository } from "./repositories/user-auth.repository";

@Module({
  imports: [
    JwtTokenModule,
    RoleModule,
    TokenModule,
    UserModule,
    TypeOrmModule.forFeature([AuthHistory, AuthProvider, UserAuth]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthHistoryRepository, AuthProviderRepository, UserAuthRepository],
  exports: [AuthService],
})
export class AuthModule {}
