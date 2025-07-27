import { Test, TestingModule } from "@nestjs/testing";
import { SignInLocalDto } from "src/modules/auth/dto/requests/sign-in-local.dto";
import { SignInLocalUseCase } from "./sign-in-local.use-case";

describe("SignUpLocalUseCase", () => {
  let useCase: SignInLocalUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignInLocalUseCase],
    }).compile();

    useCase = module.get<SignInLocalUseCase>(SignInLocalUseCase);
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
  });

  describe("execute", () => {
    it("should sign up user locally and send OTP", async () => {
      const dto: SignInLocalDto = {
        email: "john@example.com",
        password: "@SecurePassword1",
      };

      const result = await useCase.execute(dto);

      expect(result).toBe(true);
    });
  });
});
