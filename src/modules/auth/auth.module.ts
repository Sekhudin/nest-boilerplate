import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OtpModule } from "src/modules/otp/otp.module";
import { RoleModule } from "src/modules/role/role.module";
import { TokenModule } from "src/modules/token/token.module";
import { UserModule } from "src/modules/user/user.module";
import { AuthHistoryService } from "./services/auth-history.service";
import { AuthProviderService } from "./services/auth-provider.service";
import { UserAuthService } from "./services/user-auth.service";
import { AuthHistoryRepository } from "./repositories/auth-history.repository";
import { AuthProviderRepository } from "./repositories/auth-provider.repository";
import { UserAuthRepository } from "./repositories/user-auth.repository";
import { AuthHistory } from "./entities/auth-history.entity";
import { AuthProvider } from "./entities/auth-provider.entity";
import { UserAuth } from "./entities/user-auth.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SignUpLocalUseCase } from "./use-cases/sign-up-local.use-case";

@Module({
  imports: [
    OtpModule,
    RoleModule,
    TokenModule,
    UserModule,
    TypeOrmModule.forFeature([AuthHistory, AuthProvider, UserAuth]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthHistoryRepository,
    AuthProviderRepository,
    UserAuthRepository,
    AuthHistoryService,
    AuthProviderService,
    UserAuthService,
    SignUpLocalUseCase,
  ],
  exports: [AuthService],
})
export class AuthModule {}
