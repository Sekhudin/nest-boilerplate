import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserRepository } from "./user.repository";

describe("UserRepository", () => {
  let repo: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(User),
          useValue: {
            manager: {},
            queryRunner: {},
            target: User,
          },
        },
      ],
    }).compile();

    repo = module.get(UserRepository);
  });

  it("should be defined", () => {
    expect(repo).toBeDefined();
  });
});
