import { AuthGuard } from "@nestjs/passport";
import { jwtAccessConfig } from "src/configs/jwt.config";

export class JwtAccessGuard extends AuthGuard(jwtAccessConfig.name) {}
