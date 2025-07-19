import { Test, TestingModule } from "@nestjs/testing";
import { UserEmailAlreadyUsedException } from "src/shared/exceptions/user/user-email-already-used.exception";
import { RoleService } from "src/modules/role/role.service";
import { getFreshUserMock } from "test/mocks/entities/user.entity.mock";
import { getFreshUserRepositoryMock } from "test/mocks/repositories/user.repository.mock";
import { getFreshRoleServiceMock } from "test/mocks/services/role.service.mock";
import { getFreshEntityManagerMock } from "test/mocks/utils/entity-manager.mock";
import { CreateLocalUserDto } from "./dto/requests/create-local-user.dto";
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

  describe("createLocalUser", () => {
    const userMock = getFreshUserMock();
    const createLocalUserDto: CreateLocalUserDto = {
      email: "test@example.com",
      password: "securePass123",
    };

    beforeEach(() => {
      userMock.email = createLocalUserDto.email;
      userRepositoryMock.findOneBy.mockReset();
      userRepositoryMock.create.mockReset();
      userRepositoryMock.save.mockReset();
      roleServiceMock.findOrCreateDefaultRole.mockReset();
    });

    it("should create a new user when email not exists", async () => {
      userRepositoryMock.findOneBy.mockResolvedValue(null);
      userRepositoryMock.create.mockReturnValue(userMock);
      userRepositoryMock.save.mockResolvedValue(userMock);

      const result = await service.createLocalUser(createLocalUserDto);

      expect(userRepositoryMock.findOneBy).toHaveBeenCalledWith({ email: createLocalUserDto.email });
      expect(roleServiceMock.findOrCreateDefaultRole).toHaveBeenCalled();
      expect(userRepositoryMock.create).toHaveBeenCalledWith(createLocalUserDto);
      expect(userRepositoryMock.save).toHaveBeenCalledWith(userMock);
      expect(result).toEqual(userMock);
    });

    it("should throw UserEmailAlreadyUsedException if user already exists", async () => {
      const existingUserMock = getFreshUserMock();

      userRepositoryMock.findOneBy.mockResolvedValue(existingUserMock);

      await expect(service.createLocalUser(createLocalUserDto)).rejects.toThrow(UserEmailAlreadyUsedException);
      expect(userRepositoryMock.findOneBy).toHaveBeenCalledWith({ email: createLocalUserDto.email });
    });

    it("should use entityManager if provided", async () => {
      const entityManagerMock = getFreshEntityManagerMock();
      entityManagerMock.getRepository.mockReturnValue(userRepositoryMock);

      userRepositoryMock.findOneBy.mockResolvedValue(null);
      userRepositoryMock.create.mockReturnValue(userMock);
      userRepositoryMock.save.mockResolvedValue(userMock);

      const result = await service.createLocalUser(createLocalUserDto, entityManagerMock);

      expect(result).toEqual(userMock);
    });
  });
});
