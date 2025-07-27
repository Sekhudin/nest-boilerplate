import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserAuth } from "./entities/user-auth.entity";
import { UserAuthRepository } from "./user-auth.repository";

describe("UserAuthRepository", () => {
  let repo: UserAuthRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserAuthRepository,
        {
          provide: getRepositoryToken(UserAuth),
          useValue: {
            manager: {},
            queryRunner: {},
            target: UserAuth,
          },
        },
      ],
    }).compile();

    repo = module.get(UserAuthRepository);
  });

  it("should be defined", () => {
    expect(repo).toBeDefined();
  });
});
