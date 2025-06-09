import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { authConfig } from "src/config/auth.config";
import { AccessTokenGuard } from "src/shared/guards/access-token.guard";
import { RefreshTokenGuard } from "src/shared/guards/refresh-token.guard";
import { RolesGuard } from "src/shared/guards/roles.guard";

const GUARDS = {
  refresh: RefreshTokenGuard,
  access: AccessTokenGuard,
};

type Role = keyof typeof authConfig.role;
type Guard = keyof typeof GUARDS;

export const Auth = (roles: Role[] = authConfig.allRoles(), name: Guard = "access") => {
  return applyDecorators(
    SetMetadata(authConfig.META_KEY_ROLE, authConfig.pickRoles(roles)),
    UseGuards(GUARDS[name] ?? AccessTokenGuard, RolesGuard),
  );
};
