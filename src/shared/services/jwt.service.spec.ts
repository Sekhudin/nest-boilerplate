import { Test, TestingModule } from "@nestjs/testing";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { Providers } from "src/shared/testing/common";
import { JWTService } from "./jwt.service";

describe("JwtService", () => {
  let service: JWTService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({ global: true })],
      providers: Providers(JWTService, JwtService),
    }).compile();

    service = module.get<JWTService>(JWTService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("signRefreshToken", () => {
    it("should be defined", async () => {
      const token = await service.signRefreshToken({ id: "01", role: "user" });
      expect(token).toBeDefined();
      expect(typeof token).toStrictEqual("string");
    });
  });

  describe("signAccessToken", () => {
    it("should be defined", async () => {
      const token = await service.signAccessToken({ id: "01", role: "user" });
      expect(token).toBeDefined();
      expect(typeof token).toStrictEqual("string");
    });
  });

  describe("verifyToken", () => {
    it("should be valid", async () => {
      const refreshToken = await service.signRefreshToken({ id: "01", role: "user" });
      const accessToken = await service.signAccessToken({ id: "01", role: "user" });
      expect(await service.verifyAccessToken(accessToken)).toBeTruthy();
      expect(await service.verifyRefreshToken(refreshToken)).toBeTruthy();
    });

    it("should be invalid", async () => {
      const refreshToken = await service.signRefreshToken({ id: "01", role: "user" });
      const accessToken = await service.signAccessToken({ id: "01", role: "user" });
      await expect(service.verifyAccessToken(refreshToken)).rejects.toThrow();
      await expect(service.verifyRefreshToken(accessToken)).rejects.toThrow();
    });
  });

  describe("signAuthToken", () => {
    it("should be defined", async () => {
      const token = await service.signAuthToken({ id: "01", role: "user" });
      expect(token.access).toBeDefined();
      expect(token.refresh).toBeDefined();
    });
  });
});
