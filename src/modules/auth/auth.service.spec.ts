import { Test, TestingModule } from "@nestjs/testing";
import { JwtModule } from "@nestjs/jwt";
import { Imports, Providers } from "src/shared/testing/common";
import { UserModule } from "src/modules/users/user.module";
import { JWTService } from "src/shared/services/jwt.service";
import { JWTAccessStrategy } from "src/shared/strategies/jwt-access.strategy";
import { JWTRefreshStrategy } from "src/shared/strategies/jwt-refresh.strategy";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: Imports(UserModule, JwtModule.register({ global: true })),
      providers: Providers(AuthService, JWTService, JWTAccessStrategy, JWTRefreshStrategy),
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
