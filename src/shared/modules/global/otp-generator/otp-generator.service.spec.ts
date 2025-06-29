import { Test, TestingModule } from "@nestjs/testing";
import { otpConfig } from "src/config/otp.config";
import { OtpGeneratorService } from "./otp-generator.service";

const mockOtpInstance = {
  totp: jest.fn(),
};

const MockOtpClass = jest.fn(() => mockOtpInstance);

describe("OtpGeneratorService", () => {
  let service: OtpGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OtpGeneratorService,
        {
          provide: otpConfig.INJECTOR_KEY,
          useClass: MockOtpClass,
        },
      ],
    }).compile();

    service = module.get<OtpGeneratorService>(OtpGeneratorService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("generateOtp", () => {
    it("should return a TOTP string", () => {
      mockOtpInstance.totp.mockReturnValue("123456");
      const result = service.generateTotp();

      expect(result).toBe("123456");
      expect(mockOtpInstance.totp).toHaveBeenCalled();
    });
  });
});
