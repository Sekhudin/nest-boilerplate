import { Test, TestingModule } from "@nestjs/testing";
import { RoleService } from "src/modules/role/role.service";
import { getFreshUserRepositoryMock } from "test/mocks/repositories/user.repository.mock";
import { getFreshRoleServiceMock } from "test/mocks/services/role.service.mock";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

describe("UserService", () => {
  let service: UserService;
  const roleServiceMock = getFreshRoleServiceMock();
  const userRepositoryMock = getFreshUserRepositoryMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: RoleService, useValue: roleServiceMock },
        { provide: UserRepository, useValue: userRepositoryMock },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(true).toBeDefined();
  });
});
