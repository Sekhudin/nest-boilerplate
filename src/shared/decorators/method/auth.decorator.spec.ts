import { RoleName } from "@nestjs/passport";
import { AccessTokenGuard } from "src/shared/guards/access-token.guard";
import { RefreshTokenGuard } from "src/shared/guards/refresh-token.guard";
import { RolesGuard } from "src/shared/guards/roles.guard";
import { getFreshAuthConfigMock } from "test/mocks/config/auth.config.mock";
import { getFreshSetMetadataMock } from "test/mocks/decorators/set-metadata.decorator.mock";
import { getFreshUseGuardsMock } from "test/mocks/decorators/use-guards.decorator.mock";
import { Auth } from "./auth.decorator";

let setMetadataMock: ReturnType<typeof getFreshSetMetadataMock>;
let useGuardsMock: ReturnType<typeof getFreshUseGuardsMock>;
jest.mock("@nestjs/common", () => ({
  ...jest.requireActual("@nestjs/common"),
  SetMetadata: (metadata: unknown, metadataValue: unknown) => setMetadataMock(metadata, metadataValue),
  UseGuards: (...args: any[]) => useGuardsMock(...args),
}));

let authConfigMock: ReturnType<typeof getFreshAuthConfigMock>;
jest.mock("src/config/auth.config", () => ({
  get authConfig() {
    return authConfigMock;
  },
}));

describe("Auth decorator", () => {
  beforeEach(() => {
    setMetadataMock = getFreshSetMetadataMock();
    useGuardsMock = getFreshUseGuardsMock();
    authConfigMock = getFreshAuthConfigMock();
  });

  it("should apply SetMetadata and UseGuards with default values", () => {
    Auth();
    expect(setMetadataMock).toHaveBeenCalledWith(
      authConfigMock.ROLES_META_KEY,
      authConfigMock.pickRoles(authConfigMock.ALL_ROLES),
    );
    expect(useGuardsMock).toHaveBeenCalledWith(AccessTokenGuard, RolesGuard);
  });

  it('should apply AccessTokenGuard when name is "access"', () => {
    Auth(["ADMIN"], "ACCESS_GUARD");
    expect(useGuardsMock).toHaveBeenCalledWith(AccessTokenGuard, RolesGuard);
  });

  it('should apply RefreshTokenGuard when name is "refresh"', () => {
    Auth(["ADMIN"], "REFRESH_GUARD");
    expect(useGuardsMock).toHaveBeenCalledWith(RefreshTokenGuard, RolesGuard);
  });

  it("should fallback to AccessTokenGuard if unknown guard name given", () => {
    // @ts-expect-error intentional wrong value
    Auth(["admin"], "invalid")();
    expect(useGuardsMock).toHaveBeenCalledWith(AccessTokenGuard, RolesGuard);
  });

  it("should map roles correctly using authConfigMock.pickRoles", () => {
    const spy = jest.spyOn(authConfigMock, "pickRoles");
    const roles = ["USER", "ADMIN"] as RoleName[];

    Auth(roles, "ACCESS_GUARD");
    expect(spy).toHaveBeenCalledWith(roles);
  });
});
