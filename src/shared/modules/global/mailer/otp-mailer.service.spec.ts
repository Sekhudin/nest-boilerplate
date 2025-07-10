import { MailerService } from "@nestjs-modules/mailer";
import { Test, TestingModule } from "@nestjs/testing";
import { OtpMailerService } from "./otp-mailer.service";

jest.mock("src/config/mailer.config", () => ({
  mailerConfig: {
    TRANSPORTERS: {
      OTP: "OTP_TRANSPORT",
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

  it("should call sendMail with default OTP email values", async () => {
    mockMailerService.sendMail.mockResolvedValueOnce({ messageId: "otp-456" });

    const result = await service.send();

    expect(mailerService.sendMail).toHaveBeenCalledWith({
      transporterName: "OTP_TRANSPORT",
      subject: "OTP!",
      to: "sekhudinpbg3@gmail.com",
      template: "default-otp",
    });

    expect(result).toEqual({ messageId: "otp-456" });
  });
});
