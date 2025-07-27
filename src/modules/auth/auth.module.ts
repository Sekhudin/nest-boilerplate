import { Module } from "@nestjs/common";
import { AuthProviderModule } from "src/modules/auth-provider/auth-provider.module";
import { OtpModule } from "src/modules/otp/otp.module";
import { RoleModule } from "src/modules/role/role.module";
import { UserAuthModule } from "src/modules/user-auth/user-auth.module";
import { UserModule } from "src/modules/user/user.module";
import { AuthController } from "./auth.controller";
import { SignInLocalUseCase } from "./use-cases/sign-in-local.use-case";
import { SignUpLocalUseCase } from "./use-cases/sign-up-local.use-case";

@Module({
  imports: [OtpModule, RoleModule, UserModule, UserAuthModule, AuthProviderModule],
  controllers: [AuthController],
  providers: [SignUpLocalUseCase, SignInLocalUseCase],
})
export class AuthModule {}
