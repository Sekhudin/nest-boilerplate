import { Test, TestingModule } from "@nestjs/testing";
import { CryptoService } from "./crypto.service";

describe("CryptoService", () => {
  let service: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoService],
    }).compile();

    service = module.get<CryptoService>(CryptoService);
  });

  describe("password hashing", () => {
    it("should hash and verify password correctly", async () => {
      const password = "s3cret!";
      const hash = await service.hashPassword(password);

      expect(typeof hash).toBe("string");
      expect(hash).toMatch(/^\$argon2/);

      const isValid = await service.verifyPassword(password, hash);
      expect(isValid).toBe(true);
    });

    it("should fail to verify wrong password", async () => {
      const password = "password123";
      const wrongPassword = "wrong-password";
      const hash = await service.hashPassword(password);

      const isValid = await service.verifyPassword(wrongPassword, hash);
      expect(isValid).toBe(false);
    });
  });

  describe("OTP hashing", () => {
    it("should hash and verify otp correctly", async () => {
      const otp = "123456";
      const hash = await service.hashOtp(otp);

      expect(typeof hash).toBe("string");
      expect(hash).toMatch(/^\$argon2/);

      const isValid = await service.verifyOtp(otp, hash);
      expect(isValid).toBe(true);
    });

    it("should fail to verify wrong otp", async () => {
      const otp = "123456";
      const wrongOtp = "213456";
      const hash = await service.hashOtp(otp);

      const isValid = await service.verifyOtp(wrongOtp, hash);
      expect(isValid).toBe(false);
    });
  });

  describe("Auth token hashing", () => {
    it("should hash and verify token correctly", async () => {
      const otp = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
      const hash = await service.hashAuthToken(otp);

      expect(typeof hash).toBe("string");
      expect(hash).toMatch(/^\$argon2/);

      const isValid = await service.verifyAuthToken(otp, hash);
      expect(isValid).toBe(true);
    });

    it("should fail to verify wrong token", async () => {
      const otp = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
      const wrongOtp = "213456";
      const hash = await service.hashAuthToken(otp);

      const isValid = await service.verifyAuthToken(wrongOtp, hash);
      expect(isValid).toBe(false);
    });
  });

  describe("encryption", () => {
    it("should encrypt and decrypt correctly", () => {
      const plain = "Hello world!";
      const encrypted = service.encrypt(plain);
      expect(typeof encrypted).toBe("string");
      expect(encrypted).toContain(":");

      const decrypted = service.decrypt(encrypted);
      expect(decrypted).toBe(plain);
    });

    it("should throw error for invalid encrypted input", () => {
      expect(() => service.decrypt("invalidformat")).toThrow("Invalid encrypted format");
    });
  });
});
