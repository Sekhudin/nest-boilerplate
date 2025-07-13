import { RoleName } from "@nestjs/passport";
import { AccessTokenGuard } from "src/shared/guards/access-token.guard";
import { RefreshTokenGuard } from "src/shared/guards/refresh-token.guard";
import { RolesGuard } from "src/shared/guards/roles.guard";
import { getFresAuthConfigMock } from "test/mocks/config/auth.config.mock";
import { getFreshSetMetadataMock } from "test/mocks/decorators/set-metadata.decorator.mock";
import { getFreshUseGuardsMock } from "test/mocks/decorators/use-guards.decorator.mock";
import { Auth } from "./auth.decorator";

let SetMetadataMock: ReturnType<typeof getFreshSetMetadataMock>;
let UseGuardsMock: ReturnType<typeof getFreshUseGuardsMock>;
jest.mock("@nestjs/common", () => {
  const actual = jest.requireActual("@nestjs/common");
  return {
    ...actual,
    SetMetadata: (metadata: unknown, metadataValue: unknown) => SetMetadataMock(metadata, metadataValue),
    UseGuards: (...args: any[]) => UseGuardsMock(...args),
  };
});

describe("Auth decorator", () => {
  const authConfig = getFresAuthConfigMock();

  beforeEach(() => {
    SetMetadataMock = getFreshSetMetadataMock();
    UseGuardsMock = getFreshUseGuardsMock();
  });

  it("should apply SetMetadata and UseGuards with default values", () => {
    Auth();
    expect(SetMetadataMock).toHaveBeenCalledWith(authConfig.ROLES_META_KEY, authConfig.pickRoles(authConfig.ALL_ROLES));
    expect(UseGuardsMock).toHaveBeenCalledWith(AccessTokenGuard, RolesGuard);
  });

  it('should apply AccessTokenGuard when name is "access"', () => {
    Auth(["ADMIN"], "ACCESS_GUARD");
    expect(UseGuardsMock).toHaveBeenCalledWith(AccessTokenGuard, RolesGuard);
  });

  it('should apply RefreshTokenGuard when name is "refresh"', () => {
    Auth(["ADMIN"], "REFRESH_GUARD");
    expect(UseGuardsMock).toHaveBeenCalledWith(RefreshTokenGuard, RolesGuard);
  });

  it("should fallback to AccessTokenGuard if unknown guard name given", () => {
    // @ts-expect-error intentional wrong value
    Auth(["admin"], "invalid")();
    expect(UseGuardsMock).toHaveBeenCalledWith(AccessTokenGuard, RolesGuard);
  });

  it("should map roles correctly using authConfig.pickRoles", () => {
    const spy = jest.spyOn(authConfig, "pickRoles");
    const roles = ["USER", "ADMIN"] as RoleName[];

    Auth(roles, "ACCESS_GUARD");
    expect(spy).toHaveBeenCalledWith(roles);
  });
});
