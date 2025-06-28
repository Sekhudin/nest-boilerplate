import { Module } from "@nestjs/common";
import { JwtTokenModule } from "src/shared/modules/feature/jwt-token/jwt-token.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [JwtTokenModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
