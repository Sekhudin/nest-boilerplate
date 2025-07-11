import { UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { jwtAccessConfig } from "src/config/jwt-access.config";

export class AccessTokenGuard extends AuthGuard(jwtAccessConfig.STRATEGY_NAME) {
  handleRequest<TUser = any>(err: any, user: any): TUser {
    if (err || !user) {
      throw err ?? new UnauthorizedException("invalid token");
    }
    return user;
  }
}
