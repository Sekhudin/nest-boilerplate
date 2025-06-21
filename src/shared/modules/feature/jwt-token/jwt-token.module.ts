import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JwtTokenService } from "./jwt-token.service";

@Module({
  imports: [JwtModule.register({})],
  providers: [JwtService, JwtTokenService],
  exports: [JwtTokenService],
})
export class JwtTokenModule {}
