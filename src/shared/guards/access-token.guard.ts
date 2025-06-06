import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { jwtAccessConfig } from "src/config/jwt-access.config";

export class AccessTokenGuard extends AuthGuard(jwtAccessConfig.name) {
  handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
    if (err || !user) {
      throw err ?? new UnauthorizedException("invalid token");
    }
    return user;
  }
}
