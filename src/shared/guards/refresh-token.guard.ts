import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { jwtRefreshConfig } from "src/config/jwt-refresh.config";

export class RefreshTokenGuard extends AuthGuard(jwtRefreshConfig.name) {
  handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
    if (err || !user) {
      throw err ?? new UnauthorizedException("invalid token");
    }
    return user;
  }
}
