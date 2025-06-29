import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Otp } from "./entities/otp.entity";
import { OtpRepository } from "./otp.repository";

describe("OtpRepository", () => {
  let repo: OtpRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OtpRepository,
        {
          provide: getRepositoryToken(Otp),
          useValue: {
            manager: {},
            queryRunner: {},
            target: Otp,
          },
        },
      ],
    }).compile();

    repo = module.get(OtpRepository);
  });

  it("should be defined", () => {
    expect(repo).toBeDefined();
  });
});
