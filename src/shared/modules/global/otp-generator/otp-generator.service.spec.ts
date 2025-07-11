import { addMinutes, subMinutes } from "date-fns";
import { authenticator, hotp, totp } from "otplib";
import { Test } from "@nestjs/testing";
import { otpConfig } from "src/config/otp.config";
import { OtpGeneratorService } from "./otp-generator.service";

jest.mock("otplib", () => {
  const actual = jest.requireActual("otplib");
  return {
    ...actual,
    authenticator: {
      ...actual.authenticator,
      generate: jest.fn(() => "123456"),
      verify: jest.fn(() => true),
      options: {},
    },
    hotp: {
      generate: jest.fn(() => "654321"),
      verify: jest.fn(() => true),
      options: {},
    },
    totp: {
      generate: jest.fn(() => "999999"),
      verify: jest.fn(() => true),
      options: {},
    },
  };
});

describe("OtpGeneratorService", () => {
  let service: OtpGeneratorService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [OtpGeneratorService],
    }).compile();

    service = moduleRef.get(OtpGeneratorService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return false if expiresAt is in the future", () => {
    const expiresAt = addMinutes(new Date(), 5);
    expect(service.isOtpExpired(expiresAt)).toBe(false);
  });

  it("should return true if expiresAt is in the past", () => {
    const expiresAt = subMinutes(new Date(), 5);
    expect(service.isOtpExpired(expiresAt)).toBe(true);
  });

  it("should return false if expiresAt is exactly now", () => {
    const expiresAt = new Date();
    expect(service.isOtpExpired(expiresAt)).toBe(false);
  });

  it("should generate OTP with expiresAt", () => {
    const { code, expiresAt, expiresInMinutes } = service.generateOtp();

    expect(code).toBe("999999");
    expect(totp.generate).toHaveBeenCalledWith(otpConfig.SECRETS.TOTP);
    expect(expiresAt).toBeInstanceOf(Date);
    expect(expiresInMinutes).toBeTruthy();

    const expected = addMinutes(new Date(), 5).getTime();
    expect(Math.abs(expected - expiresAt.getTime())).toBeLessThan(1000);
  });

  it("should generate TOTP", () => {
    const result = service.generateTotp();
    expect(result).toBe("999999");
    expect(totp.generate).toHaveBeenCalledWith(otpConfig.SECRETS.TOTP);
  });

  it("should verify TOTP", () => {
    const result = service.verifyTotp("999999");
    expect(result).toBe(true);
    expect(totp.verify).toHaveBeenCalledWith({
      token: "999999",
      secret: otpConfig.SECRETS.TOTP,
    });
  });

  it("should generate HOTP", () => {
    const result = service.generateHotp(5);
    expect(result).toBe("654321");
    expect(hotp.generate).toHaveBeenCalledWith(otpConfig.SECRETS.HOTP, 5);
  });

  it("should verify HOTP", () => {
    const result = service.verifyHotp("654321", 5);
    expect(result).toBe(true);
    expect(hotp.verify).toHaveBeenCalledWith({
      token: "654321",
      secret: otpConfig.SECRETS.HOTP,
      counter: 5,
    });
  });

  it("should generate Authenticator token", () => {
    const result = service.generateAuthenticator();
    expect(result).toBe("123456");
    expect(authenticator.generate).toHaveBeenCalledWith(otpConfig.SECRETS.AUTHENTICATOR);
  });

  it("should verify Authenticator token", () => {
    const result = service.verifyAuthenticator("123456");
    expect(result).toBe(true);
    expect(authenticator.verify).toHaveBeenCalledWith({
      token: "123456",
      secret: otpConfig.SECRETS.AUTHENTICATOR,
    });
  });
});
