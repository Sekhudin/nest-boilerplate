import "@nestjs/passport";
import { authConfig } from "src/config/auth.config";

declare module "@nestjs/passport" {
  type RoleName = keyof typeof authConfig.ROLES;
  type AuthGuardName = "REFRESH_GUARD" | "ACCESS_GUARD";
  type AuthGuards = Record<AuthGuardName, Type<IAuthGuard>>;
}
