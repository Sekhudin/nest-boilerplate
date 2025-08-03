import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { RoleName } from "@nestjs/passport";
import { RefreshTokenGuard } from "src/shared/guards/refresh-token.guard";
import { RolesGuard } from "src/shared/guards/roles.guard";
import { authConfig } from "src/config/auth.config";

export const RefreshAuth = (roles: RoleName[] = authConfig.ALL_ROLES) => {
  return applyDecorators(
    SetMetadata(authConfig.ROLES_META_KEY, authConfig.pickRoles(roles)),
    UseGuards(RefreshTokenGuard, RolesGuard),
  );
};
