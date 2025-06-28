import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AuthHistory } from "src/modules/auth/entities/auth-history.entity";
import { AuthHistoryRepository } from "./auth-history.repository";

describe("AuthHistoryRepository", () => {
  let repo: AuthHistoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthHistoryRepository,
        {
          provide: getRepositoryToken(AuthHistory),
          useValue: {
            manager: {},
            queryRunner: {},
            target: AuthHistory,
          },
        },
      ],
    }).compile();

    repo = module.get(AuthHistoryRepository);
  });

  it("should be defined", () => {
    expect(repo).toBeDefined();
  });
});
