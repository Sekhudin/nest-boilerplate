import { Request } from "express";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Claims } from "src/shared/dto/claims.dto";
import { ForbiddenException } from "src/shared/exceptions/auth/forbidden.exception";
import { PermissionRoleRequiredException } from "src/shared/exceptions/permission/permission-role-required.exception";
import { authConfig } from "src/config/auth.config";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(authConfig.ROLES_META_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as Claims;

    if (!user?.roles || !user.roles.length) {
      throw new ForbiddenException();
    }

    const hasRole = requiredRoles.some((role) => user.roles.includes(role));

    if (!hasRole) {
      throw new PermissionRoleRequiredException();
    }

    return true;
  }
}
