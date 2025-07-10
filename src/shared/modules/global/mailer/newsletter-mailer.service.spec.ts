import { MailerService } from "@nestjs-modules/mailer";
import { Test, TestingModule } from "@nestjs/testing";
import { NewsletterMailerService } from "./newsletter-mailer.service";

jest.mock("src/config/mailer.config", () => ({
  mailerConfig: {
    TRANSPORTERS: {
      NEWSLETTER: "NEWSLETTER_TRANSPORT",
    },
  },
}));

describe("NewsletterMailerService", () => {
  let service: NewsletterMailerService;
  let mailerService: MailerService;

  const mockMailerService = {
    sendMail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewsletterMailerService,
        {
          provide: MailerService,
          useValue: mockMailerService,
        },
      ],
    }).compile();

    service = module.get<NewsletterMailerService>(NewsletterMailerService);
    mailerService = module.get<MailerService>(MailerService);
  });

  afterEach(() => jest.clearAllMocks());

  it("should send mail with transporterName set to newsletter", async () => {
    mockMailerService.sendMail.mockResolvedValueOnce({ messageId: "789" });

    const result = await service.sendMail({
      subject: "Test Newsletter",
      to: "user@example.com",
      template: "newsletter-template",
    });

    expect(mailerService.sendMail).toHaveBeenCalledWith({
      transporterName: "NEWSLETTER_TRANSPORT",
      subject: "Test Newsletter",
      to: "user@example.com",
      template: "newsletter-template",
    });

    expect(result).toEqual({ messageId: "789" });
  });

  it("should call sendMail with default newsletter email values", async () => {
    mockMailerService.sendMail.mockResolvedValueOnce({ messageId: "101112" });

    const result = await service.send();

    expect(mailerService.sendMail).toHaveBeenCalledWith({
      transporterName: "NEWSLETTER_TRANSPORT",
      subject: "NEWSLETTER!",
      to: "sekhudinpbg3@gmail.com",
      template: "default-newsletter",
    });

    expect(result).toEqual({ messageId: "101112" });
  });
});
