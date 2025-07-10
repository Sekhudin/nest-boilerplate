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
});
