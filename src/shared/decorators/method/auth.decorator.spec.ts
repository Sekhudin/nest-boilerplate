import { SetMetadata, UseGuards } from "@nestjs/common";
import { AccessTokenGuard } from "src/shared/guards/access-token.guard";
import { RefreshTokenGuard } from "src/shared/guards/refresh-token.guard";
import { RolesGuard } from "src/shared/guards/roles.guard";
import { authConfig } from "src/config/auth.config";
import { Auth } from "./auth.decorator";

jest.mock("@nestjs/common", () => ({
  ...jest.requireActual("@nestjs/common"),
  SetMetadata: jest.fn(() => () => {}),
  UseGuards: jest.fn(() => () => {}),
}));

describe("Auth decorator", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should apply SetMetadata and UseGuards with default values", () => {
    Auth();

    expect(SetMetadata).toHaveBeenCalledWith(authConfig.ROLES_META_KEY, authConfig.pickRoles(authConfig.ALL_ROLES));

    expect(UseGuards).toHaveBeenCalledWith(AccessTokenGuard, RolesGuard);
  });

  it('should apply AccessTokenGuard when name is "access"', () => {
    Auth(["ADMIN"], "ACCESS_GUARD");

    expect(UseGuards).toHaveBeenCalledWith(AccessTokenGuard, RolesGuard);
  });

  it('should apply RefreshTokenGuard when name is "refresh"', () => {
    Auth(["ADMIN"], "REFRESH_GUARD");

    expect(UseGuards).toHaveBeenCalledWith(RefreshTokenGuard, RolesGuard);
  });

  it("should fallback to AccessTokenGuard if unknown guard name given", () => {
    // @ts-expect-error intentional wrong value
    Auth(["admin"], "invalid")();

    expect(UseGuards).toHaveBeenCalledWith(AccessTokenGuard, RolesGuard);
  });

  it("should map roles correctly using authConfig.pickRoles", () => {
    const spy = jest.spyOn(authConfig, "pickRoles");
    const roles = ["admin", "user"] as any;

    Auth(roles, "ACCESS_GUARD");

    expect(spy).toHaveBeenCalledWith(roles);
  });
});
