import { AuthGuard } from "@nestjs/passport";
import { TokenInvalidException } from "src/shared/exceptions/auth/token-invalid.exception";
import { jwtAccessConfig } from "src/config/jwt-access.config";

export class AccessTokenGuard extends AuthGuard(jwtAccessConfig.STRATEGY_NAME) {
  handleRequest<TUser = any>(err: any, user: any): TUser {
    if (err || !user) {
      throw err ?? new TokenInvalidException();
    }
    return user;
  }
}
