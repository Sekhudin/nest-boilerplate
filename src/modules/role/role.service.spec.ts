import { Test, TestingModule } from "@nestjs/testing";
import { getFreshAuthConfigMock } from "test/mocks/config/auth.config.mock";
import { getFreshRoleMock } from "test/mocks/entities/role.entity.mock";
import { getFreshRoleRepositoryMock } from "test/mocks/repositories/role.repository.mock";
import { RoleRepository } from "./role.repository";
import { RoleService } from "./role.service";

describe("RoleService", () => {
  let service: RoleService;
  const authConfigMock = getFreshAuthConfigMock();
  const roleRepositoryMock = getFreshRoleRepositoryMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleService, { provide: RoleRepository, useValue: roleRepositoryMock }],
    }).compile();

    service = module.get<RoleService>(RoleService);
  });

  it("should be defined", () => {
    expect(true).toBeDefined();
  });

  describe("findOrCreateDefaultRole", () => {
    const roleMock = getFreshRoleMock();
    roleMock.name = authConfigMock.DEFAULT_ROLE;

    beforeAll(() => {
      roleRepositoryMock.findOneBy.mockReset();
      roleRepositoryMock.create.mockReset();
      roleRepositoryMock.save.mockReset();
    });

    it("should return role when it exits", async () => {
      roleRepositoryMock.findOneBy.mockResolvedValue(roleMock);

      const result = await service.findOrCreateDefaultRole();
      expect(roleRepositoryMock.findOneBy).toHaveBeenCalled();
      expect(result).toEqual(roleMock);
    });

    it("should create new role if it doesn't exist and then return the created role", async () => {
      roleRepositoryMock.findOneBy.mockResolvedValue(null);
      roleRepositoryMock.create.mockReturnValue(roleMock);
      roleRepositoryMock.save.mockResolvedValue(roleMock);

      const result = await service.findOrCreateDefaultRole();
      expect(roleRepositoryMock.findOneBy).toHaveBeenCalledWith({ name: authConfigMock.DEFAULT_ROLE });
      expect(roleRepositoryMock.create).toHaveBeenCalled();
      expect(roleRepositoryMock.save).toHaveBeenCalledWith(roleMock);
      expect(result).toEqual(roleMock);
    });
  });
});
