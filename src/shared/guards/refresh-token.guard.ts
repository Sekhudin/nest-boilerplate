import { AuthGuard } from "@nestjs/passport";
import { jwtRefreshConfig } from "src/config/jwt-refresh.config";

export class RefreshTokenGuard extends AuthGuard(jwtRefreshConfig.name) {}
