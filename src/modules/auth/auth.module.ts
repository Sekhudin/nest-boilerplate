import { Module } from "@nestjs/common";
import { AuthHistoryModule } from "src/modules/auth-history/auth-history.module";
import { AuthProviderModule } from "src/modules/auth-provider/auth-provider.module";
import { OtpModule } from "src/modules/otp/otp.module";
import { RoleModule } from "src/modules/role/role.module";
import { TokenModule } from "src/modules/token/token.module";
import { UserAuthModule } from "src/modules/user-auth/user-auth.module";
import { UserModule } from "src/modules/user/user.module";
import { AuthController } from "./auth.controller";
import { RefreshTokenUseCase } from "./use-cases/refresh-token.use-case";
import { SignInLocalUseCase } from "./use-cases/sign-in-local.use-case";
import { SignOutUseCase } from "./use-cases/sign-out.use-case";
import { SignUpLocalUseCase } from "./use-cases/sign-up-local.use-case";

@Module({
  imports: [OtpModule, RoleModule, UserModule, UserAuthModule, AuthProviderModule, AuthHistoryModule, TokenModule],
  controllers: [AuthController],
  providers: [SignUpLocalUseCase, SignInLocalUseCase, RefreshTokenUseCase, SignOutUseCase],
})
export class AuthModule {}
