import { SetMetadata } from "@nestjs/common";
import { jwtRoles, jwtRoleKey } from "src/configs/jwt.config";
import type { JwtRole } from "src/types/global.type";

export const Role = (roles: JwtRole) => SetMetadata(jwtRoleKey, roles);
export const AllRole = () => SetMetadata(jwtRoleKey, jwtRoles);
