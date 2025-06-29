import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AccessTokenStrategy } from "src/shared/strategies/access-token.strategy";
import { RefreshTokenStrategy } from "src/shared/strategies/refresh-token.strategy";
import { JwtTokenService } from "./jwt-token.service";

@Global()
@Module({
  imports: [PassportModule, JwtModule.register({})],
  providers: [RefreshTokenStrategy, AccessTokenStrategy, JwtTokenService],
  exports: [PassportModule, JwtTokenService],
})
export class JwtTokenModule {}
