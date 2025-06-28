import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Token } from "./entities/token.entity";
import { TokenRepository } from "./token.repository";

describe("TokenRepository", () => {
  let repo: TokenRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenRepository,
        {
          provide: getRepositoryToken(Token),
          useValue: {
            manager: {},
            queryRunner: {},
            target: Token,
          },
        },
      ],
    }).compile();

    repo = module.get(TokenRepository);
  });

  it("should be defined", () => {
    expect(repo).toBeDefined();
  });
});
