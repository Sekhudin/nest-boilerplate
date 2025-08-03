import { RoleName } from "@nestjs/passport";
import { RefreshTokenGuard } from "src/shared/guards/refresh-token.guard";
import { RolesGuard } from "src/shared/guards/roles.guard";
import { getFreshAuthConfigMock } from "test/mocks/config/auth.config.mock";
import { getFreshSetMetadataMock } from "test/mocks/decorators/set-metadata.decorator.mock";
import { getFreshUseGuardsMock } from "test/mocks/decorators/use-guards.decorator.mock";
import { RefreshAuth } from "./refresh-auth.guard";

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

describe("AccessAuth", () => {
  beforeEach(() => {
    setMetadataMock = getFreshSetMetadataMock();
    useGuardsMock = getFreshUseGuardsMock();
    authConfigMock = getFreshAuthConfigMock();
  });

  it("should apply SetMetadata and UseGuards with default values", () => {
    RefreshAuth();
    expect(setMetadataMock).toHaveBeenCalledWith(
      authConfigMock.ROLES_META_KEY,
      authConfigMock.pickRoles(authConfigMock.ALL_ROLES),
    );
    expect(useGuardsMock).toHaveBeenCalledWith(RefreshTokenGuard, RolesGuard);
  });

  it("should map roles correctly using authConfigMock.pickRoles", () => {
    const spy = jest.spyOn(authConfigMock, "pickRoles");
    const roles = ["USER", "ADMIN"] as RoleName[];

    RefreshAuth(roles);
    expect(spy).toHaveBeenCalledWith(roles);
  });
});
