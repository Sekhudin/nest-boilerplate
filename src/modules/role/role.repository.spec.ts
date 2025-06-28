import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Role } from "./entities/role.entity";
import { RoleRepository } from "./role.repository";

describe("RoleRepository", () => {
  let repo: RoleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleRepository,
        {
          provide: getRepositoryToken(Role),
          useValue: {
            manager: {},
            queryRunner: {},
            target: Role,
          },
        },
      ],
    }).compile();

    repo = module.get(RoleRepository);
  });

  it("should be defined", () => {
    expect(repo).toBeDefined();
  });
});
