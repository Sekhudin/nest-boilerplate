import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { RoleName } from "@nestjs/passport";
import { AccessTokenGuard } from "src/shared/guards/access-token.guard";
import { RolesGuard } from "src/shared/guards/roles.guard";
import { authConfig } from "src/config/auth.config";

export const AccessAuth = (roles: RoleName[] = authConfig.ALL_ROLES) => {
  return applyDecorators(
    SetMetadata(authConfig.ROLES_META_KEY, authConfig.pickRoles(roles)),
    UseGuards(AccessTokenGuard, RolesGuard),
  );
};
