import { AuthGuard } from "@nestjs/passport";
import { jwtAccessConfig } from "src/config/jwt-access.config";

export class AccessTokenGuard extends AuthGuard(jwtAccessConfig.name) {}
