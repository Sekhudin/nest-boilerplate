import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AccessTokenStrategy } from "src/shared/strategies/access-token.strategy";
import { RefreshTokenStrategy } from "src/shared/strategies/refresh-token.strategy";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [RefreshTokenStrategy, AccessTokenStrategy, AuthService],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
