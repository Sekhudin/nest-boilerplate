import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { TokenService } from "./token.service";

@Module({
  imports: [JwtModule.register({})],
  providers: [JwtService, TokenService],
  exports: [TokenService],
})
export class TokenModule {}
