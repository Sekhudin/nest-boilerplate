import { MailerService } from "@nestjs-modules/mailer";
import { Test, TestingModule } from "@nestjs/testing";
import { getFreshMailerConfigMock } from "test/mocks/config/mailer.config.mock";
import { getFreshMailerServiceMock } from "test/mocks/services/mailer.service.mock";
import { BillingMailerService } from "./billing-mailer.service";

let mailerConfigMock: ReturnType<typeof getFreshMailerConfigMock>;
jest.mock("src/config/mailer.config", () => ({
  get mailerConfig() {
    return mailerConfigMock;
  },
}));

describe("BillingMailerService", () => {
  const mailerServiceMock = getFreshMailerServiceMock();
  let service: BillingMailerService;
  let mailerService: MailerService;

  beforeEach(async () => {
    mailerConfigMock = getFreshMailerConfigMock();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BillingMailerService,
        {
          provide: MailerService,
          useValue: mailerServiceMock,
        },
      ],
    }).compile();

    service = module.get<BillingMailerService>(BillingMailerService);
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

  it("should send mail with transporterName set to billing", async () => {
    mailerServiceMock.sendMail.mockResolvedValueOnce({ messageId: "123" });

    const result = await service.sendMail({
      subject: "Test Subject",
      to: "user@example.com",
      template: "template-name",
    });

    expect(mailerService.sendMail).toHaveBeenCalledWith({
      transporterName: "BILLING_TRANSPORT",
      subject: "Test Subject",
      to: "user@example.com",
      template: "template-name",
    });
    expect(result).toEqual({ messageId: "123" });
  });

  it("should call sendMail with default billing email values", async () => {
    mailerServiceMock.sendMail.mockResolvedValueOnce({ messageId: "456" });

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
