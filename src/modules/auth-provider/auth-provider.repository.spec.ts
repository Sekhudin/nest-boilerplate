import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AuthProvider } from "./entities/auth-provider.entity";
import { AuthProviderRepository } from "./auth-provider.repository";

describe("AuthProviderRepository", () => {
  let repo: AuthProviderRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthProviderRepository,
        {
          provide: getRepositoryToken(AuthProvider),
          useValue: {
            manager: {},
            queryRunner: {},
            target: AuthProvider,
          },
        },
      ],
    }).compile();

    repo = module.get(AuthProviderRepository);
  });

  it("should be defined", () => {
    expect(repo).toBeDefined();
  });
});
