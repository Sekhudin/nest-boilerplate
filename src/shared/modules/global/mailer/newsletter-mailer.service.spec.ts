import { MailerService } from "@nestjs-modules/mailer";
import { Test, TestingModule } from "@nestjs/testing";
import { getFresMailerConfigMock } from "test/mocks/config/mailer.config.mock";
import { getFreshMailerServiceMock } from "test/mocks/services/mailer.service.mock";
import { NewsletterMailerService } from "./newsletter-mailer.service";

let mailerConfigMock: ReturnType<typeof getFresMailerConfigMock>;
jest.mock("src/config/mailer.config", () => ({
  get mailerConfig() {
    return mailerConfigMock;
  },
}));

describe("NewsletterMailerService", () => {
  const mailerServiceMock = getFreshMailerServiceMock();
  let service: NewsletterMailerService;
  let mailerService: MailerService;

  beforeEach(async () => {
    mailerConfigMock = getFresMailerConfigMock();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewsletterMailerService,
        {
          provide: MailerService,
          useValue: mailerServiceMock,
        },
      ],
    }).compile();

    service = module.get<NewsletterMailerService>(NewsletterMailerService);
    mailerService = module.get<MailerService>(MailerService);
  });

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

  it("should send mail with transporterName set to newsletter", async () => {
    mailerServiceMock.sendMail.mockResolvedValueOnce({ messageId: "789" });

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
    mailerServiceMock.sendMail.mockResolvedValueOnce({ messageId: "101112" });

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
