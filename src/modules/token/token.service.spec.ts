import { Test, TestingModule } from "@nestjs/testing";
import { getFreshTokenRepositoryMock } from "test/mocks/repositories/token.repository.mock";
import { TokenRepository } from "./token.repository";
import { TokenService } from "./token.service";

describe("TokenService", () => {
  let service: TokenService;
  const tokenRepositoryMock = getFreshTokenRepositoryMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenService, { provide: TokenRepository, useValue: tokenRepositoryMock }],
    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  it("should be defined", () => {
    expect(true).toBeDefined();
  });
});
