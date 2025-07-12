import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuardName, AuthGuards, RoleName } from "@nestjs/passport";
import { AccessTokenGuard } from "src/shared/guards/access-token.guard";
import { RefreshTokenGuard } from "src/shared/guards/refresh-token.guard";
import { RolesGuard } from "src/shared/guards/roles.guard";
import { authConfig } from "src/config/auth.config";

const GUARDS: AuthGuards = {
  REFRESH_GUARD: RefreshTokenGuard,
  ACCESS_GUARD: AccessTokenGuard,
};

export const Auth = (roles: RoleName[] = authConfig.ALL_ROLES, name: AuthGuardName = "ACCESS_GUARD") => {
  return applyDecorators(
    SetMetadata(authConfig.ROLES_META_KEY, authConfig.pickRoles(roles)),
    UseGuards(GUARDS[name] ?? GUARDS.ACCESS_GUARD, RolesGuard),
  );
};
