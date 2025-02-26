import { AuthGuard } from "@nestjs/passport";
import { jwtRefreshConfig } from "src/configs/jwt.config";

export class JwtRefreshGuard extends AuthGuard(jwtRefreshConfig.name) {}
