import { MailerService } from "@nestjs-modules/mailer";
import { Test, TestingModule } from "@nestjs/testing";
import { BillingMailerService } from "./billing-mailer.service";

jest.mock("src/config/mailer.config", () => ({
  mailerConfig: {
    TRANSPORTERS: {
      BILLING: "BILLING_TRANSPORT",
    },

    context<T>(contextValue: T): { year: number } & T {
      return { year: 2025, ...contextValue };
    },

    emailFrom(senderType: string) {
      return senderType;
    },
  },
}));

describe("BillingMailerService", () => {
  let service: BillingMailerService;
  let mailerService: MailerService;

  const mockMailerService = {
    sendMail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BillingMailerService,
        {
          provide: MailerService,
          useValue: mockMailerService,
        },
      ],
    }).compile();

    service = module.get<BillingMailerService>(BillingMailerService);
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

  it("should send mail with transporterName set to billing", async () => {
    mockMailerService.sendMail.mockResolvedValueOnce({ messageId: "123" });

    const result = await service.sendMail({
      subject: "Test Subject",
      to: "user@example.com",
      template: "template-name",
    });

    expect(mailerService.sendMail).toHaveBeenCalledWith({
      transporterName: "BILLING_TRANSPORT", // 💡 gunakan value dari mock
      subject: "Test Subject",
      to: "user@example.com",
      template: "template-name",
    });
    expect(result).toEqual({ messageId: "123" });
  });

  it("should call sendMail with default billing email values", async () => {
    mockMailerService.sendMail.mockResolvedValueOnce({ messageId: "456" });

    const result = await service.send();

    expect(mailerService.sendMail).toHaveBeenCalledWith({
      transporterName: "BILLING_TRANSPORT",
      subject: "BILLING!",
      to: "sekhudinpbg3@gmail.com",
      template: "default-billing",
    });
    expect(result).toEqual({ messageId: "456" });
  });
});
