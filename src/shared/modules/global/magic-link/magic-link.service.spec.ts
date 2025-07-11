import { Test, TestingModule } from "@nestjs/testing";
import { magicLinkConfig, MagicLinkOptions } from "src/config/magic-link.config";
import { MagicLinkService } from "./magic-link.service";

describe("MagicLinkService", () => {
  let service: MagicLinkService;

  const mockOptions: MagicLinkOptions = {
    frontendUrl: "http://fe.com",
    verifyEmailPath: "/verify",
    resetPasswordPath: "/reset-password",
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MagicLinkService,
        {
          provide: magicLinkConfig.OPTIONS_INJECTOR_KEY,
          useValue: mockOptions,
        },
      ],
    }).compile();

    service = module.get<MagicLinkService>(MagicLinkService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should generate correct email verification link", () => {
    const payload = {
      token: "abc123",
      purpose: "email-verification",
    };

    const result = service.generateEmailVerificationLink(payload);

    expect(result).toBe("http://fe.com/verify?token=abc123&purpose=email-verification");
  });

  it("should generate valid URL object", () => {
    const payload = {
      token: "xyz789",
      purpose: "test-purpose",
    };

    const result = new URL(service.generateEmailVerificationLink(payload));
    expect(result.origin).toBe("http://fe.com");
    expect(result.pathname).toBe("/verify");
    expect(result.searchParams.get("token")).toBe("xyz789");
    expect(result.searchParams.get("purpose")).toBe("test-purpose");
  });
});
