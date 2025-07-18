import { AuthGuard } from "@nestjs/passport";
import { TokenInvalidException } from "src/shared/exceptions/auth/token-invalid.exception";
import { jwtRefreshConfig } from "src/config/jwt-refresh.config";

export class RefreshTokenGuard extends AuthGuard(jwtRefreshConfig.STRATEGY_NAME) {
  handleRequest<TUser = any>(err: any, user: any): TUser {
    if (err || !user) {
      throw err ?? new TokenInvalidException();
    }
    return user;
  }
}
