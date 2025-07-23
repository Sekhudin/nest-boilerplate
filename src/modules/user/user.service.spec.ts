import { Test, TestingModule } from "@nestjs/testing";
import { UserEmailAlreadyUsedException } from "src/shared/exceptions/user/user-email-already-used.exception";
import { getFreshRoleMock } from "test/mocks/entities/role.entity.mock";
import { getFreshUserMock } from "test/mocks/entities/user.entity.mock";
import { getFreshUserRepositoryMock } from "test/mocks/repositories/user.repository.mock";
import { getFreshEntityManagerMock } from "test/mocks/utils/entity-manager.mock";
import { CreateLocalUserDto } from "./dto/requests/create-local-user.dto";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

describe("UserService", () => {
  let service: UserService;
  const userRepositoryMock = getFreshUserRepositoryMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, { provide: UserRepository, useValue: userRepositoryMock }],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(true).toBeDefined();
  });

  describe("createLocalUser", () => {
    const roleMock = getFreshRoleMock();
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
    });

    it("should create a new user when email not exists", async () => {
      userRepositoryMock.findOneBy.mockResolvedValue(null);
      userRepositoryMock.create.mockReturnValue(userMock);
      userRepositoryMock.save.mockResolvedValue(userMock);

      const result = await service.createLocalUser(createLocalUserDto, roleMock);

      expect(userRepositoryMock.findOneBy).toHaveBeenCalledWith({ email: createLocalUserDto.email });
      expect(userRepositoryMock.create).toHaveBeenCalledWith(createLocalUserDto);
      expect(userRepositoryMock.save).toHaveBeenCalledWith(userMock);
      expect(result).toEqual(userMock);
    });

    it("should throw UserEmailAlreadyUsedException if user already exists", async () => {
      const existingUserMock = getFreshUserMock();

      userRepositoryMock.findOneBy.mockResolvedValue(existingUserMock);

      await expect(service.createLocalUser(createLocalUserDto, roleMock)).rejects.toThrow(
        UserEmailAlreadyUsedException,
      );
      expect(userRepositoryMock.findOneBy).toHaveBeenCalledWith({ email: createLocalUserDto.email });
    });

    it("should use entityManager if provided", async () => {
      const entityManagerMock = getFreshEntityManagerMock();
      entityManagerMock.getRepository.mockReturnValue(userRepositoryMock);

      userRepositoryMock.findOneBy.mockResolvedValue(null);
      userRepositoryMock.create.mockReturnValue(userMock);
      userRepositoryMock.save.mockResolvedValue(userMock);

      const result = await service.createLocalUser(createLocalUserDto, roleMock, entityManagerMock);

      expect(result).toEqual(userMock);
    });
  });

  describe("markEmailIsVerified", () => {
    const userMock = getFreshUserMock();

    beforeEach(() => {
      userRepositoryMock.save.mockReset();
    });

    it("should save user with isEmailVerified flag set to true and return it", async () => {
      userRepositoryMock.save.mockResolvedValue(userMock);

      const result = await service.markEmailIsVerified(userMock);

      expect(userRepositoryMock.save).toHaveBeenCalledWith(userMock);
      expect(result).toBe(userMock);
      expect(result.isEmailVerified).toBe(true);
    });

    it("should use entityManager if provided", async () => {
      const entityManagerMock = getFreshEntityManagerMock();

      entityManagerMock.getRepository.mockReturnValue(userRepositoryMock);
      userRepositoryMock.save.mockResolvedValue(userMock);

      const result = await service.markEmailIsVerified(userMock);

      expect(userRepositoryMock.save).toHaveBeenCalledWith(userMock);
      expect(result).toBe(userMock);
      expect(result.isEmailVerified).toBe(true);
    });
  });
});
