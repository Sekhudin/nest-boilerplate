import { match, P } from "ts-pattern";
import { applyDecorators, UseGuards } from "@nestjs/common";
import { JwtAccessGuard } from "src/shared/guards/jwt-access.guard";
import { JwtRefreshGuard } from "src/shared/guards/jwt-refresh.guard";
import { JwtRolesGuard } from "src/shared/guards/jwt-role.guard";
import type { JwtRole } from "src/types/global.type";
import { Role, AllRole } from "./role.decorator";

export const AuthToken = (roles?: JwtRole[]) => {
  return match(roles)
    .with(P.not(P.nullish), () =>
      applyDecorators(Role(roles), UseGuards(JwtRefreshGuard, JwtAccessGuard, JwtRolesGuard)),
    )
    .otherwise(() => applyDecorators(AllRole(), UseGuards(JwtRefreshGuard, JwtAccessGuard, JwtRolesGuard)));
};
