import { MailerService, SendEmailVerificationContext } from "@nestjs-modules/mailer";
import { Test, TestingModule } from "@nestjs/testing";
import { OtpMailerService } from "./otp-mailer.service";

jest.mock("src/config/mailer.config", () => ({
  mailerConfig: {
    TRANSPORTERS: {
      OTP: "OTP_TRANSPORT",
    },

    context<T>(contextValue: T): { year: number } & T {
      return { year: 2025, ...contextValue };
    },

    emailFrom(senderType: string) {
      return senderType;
    },
  },
}));

describe("OtpMailerService", () => {
  let service: OtpMailerService;
  let mailerService: MailerService;

  const mockMailerService = {
    sendMail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OtpMailerService,
        {
          provide: MailerService,
          useValue: mockMailerService,
        },
      ],
    }).compile();

    service = module.get<OtpMailerService>(OtpMailerService);
    mailerService = module.get<MailerService>(MailerService);
  });

  afterEach(() => jest.clearAllMocks());

  it("should create context with default merged values", () => {
    const context = service.createContext({
      to: "user@example.com",
      otp: "123456",
      magicLink: "https://example.com/verify",
      expiresIn: 10,
    });

    expect(context).toMatchObject({
      to: "user@example.com",
      otp: "123456",
      magicLink: "https://example.com/verify",
      expiresIn: 10,
      year: expect.any(Number),
    });
  });

  it("should send mail with transporterName set to otp", async () => {
    mockMailerService.sendMail.mockResolvedValueOnce({ messageId: "otp-123" });

    const result = await service.sendMail({
      subject: "Test OTP",
      to: "otp@example.com",
      template: "otp-template",
    });

    expect(mailerService.sendMail).toHaveBeenCalledWith({
      transporterName: "OTP_TRANSPORT",
      subject: "Test OTP",
      to: "otp@example.com",
      template: "otp-template",
    });

    expect(result).toEqual({ messageId: "otp-123" });
  });

  it("should send email verification with correct options", async () => {
    mockMailerService.sendMail.mockResolvedValueOnce({ messageId: "abc-456" });

    const context: SendEmailVerificationContext = {
      to: "user@example.com",
      code: "123456",
      magicLink: "https://example.com/verify",
      expiresInMinutes: 10,
      ipAddress: "127.0.0.1",
      browser: "Chrome",
      os: "Windows",
    };

    const result = await service.sendEmailVerification(context);

    expect(mailerService.sendMail).toHaveBeenCalled();
    expect(result).toEqual({ messageId: "abc-456" });
  });
});
