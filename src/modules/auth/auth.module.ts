import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { CookieService } from "src/shared/modules/global/context/cookie.service";
import { AccessTokenStrategy } from "src/shared/strategies/access-token.strategy";
import { RefreshTokenStrategy } from "src/shared/strategies/refresh-token.strategy";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [PassportModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [RefreshTokenStrategy, AccessTokenStrategy, AuthService],
})
export class AuthModule {}
