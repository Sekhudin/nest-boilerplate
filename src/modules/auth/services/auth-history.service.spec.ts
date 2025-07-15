import { Test, TestingModule } from "@nestjs/testing";
import { AuthHistoryRepository } from "src/modules/auth/repositories/auth-history.repository";
import { getFreshAuthHistoryRepositoryMock } from "test/mocks/repositories/auth-history.repository.mock";
import { AuthHistoryService } from "./auth-history.service";

describe("AuthHistoryService", () => {
  let service: AuthHistoryService;
  const authHistoryRepositoryMock = getFreshAuthHistoryRepositoryMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthHistoryService, { provide: AuthHistoryRepository, useValue: authHistoryRepositoryMock }],
    }).compile();

    service = module.get<AuthHistoryService>(AuthHistoryService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
