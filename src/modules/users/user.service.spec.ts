import { Test, TestingModule } from "@nestjs/testing";
import { Imports, Providers } from "src/shared/testing/common";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";

describe("UserService", () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: Imports(),
      providers: Providers(UserService, UserRepository),
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
