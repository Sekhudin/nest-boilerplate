import { Test, TestingModule } from "@nestjs/testing";
import { Imports, Providers } from "src/shared/testing/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";

describe("UserController", () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: Imports(),
      controllers: [UserController],
      providers: Providers(UserService, UserRepository),
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
