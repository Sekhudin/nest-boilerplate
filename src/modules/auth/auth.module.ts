import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/modules/users/user.module";
import { JWTService } from "src/shared/services/jwt.service";
import { JWTAccessStrategy } from "src/shared/strategies/jwt-access.strategy";
import { JWTRefreshStrategy } from "src/shared/strategies/jwt-refresh.strategy";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [JwtModule.register({ global: true }), UserModule],
  controllers: [AuthController],
  providers: [AuthService, JWTService, JWTRefreshStrategy, JWTAccessStrategy],
  exports: [AuthService, JWTService],
})
export class AuthModule {}
