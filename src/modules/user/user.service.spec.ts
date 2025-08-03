import { Test, TestingModule } from "@nestjs/testing";
import { UserAuthenticationFailedException } from "src/shared/exceptions/user/user-authentication-failed.exception";
import { UserEmailAlreadyUsedException } from "src/shared/exceptions/user/user-email-already-used.exception";
import { UserEmailNotVerifiedException } from "src/shared/exceptions/user/user-email-not-verified.exception";
import { UserInactiveException } from "src/shared/exceptions/user/user-inactive.exception";
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
      role: [roleMock],
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

      const result = await service.createLocalUser(createLocalUserDto);

      expect(userRepositoryMock.findOneBy).toHaveBeenCalledWith({ email: createLocalUserDto.email });
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

  describe("findRegisteredUserOrThrow", () => {
    const userMock = getFreshUserMock();

    beforeEach(() => {});

    it("should return registered user", async () => {
      userMock.email = "example@mail.com";
      userMock.isActive = true;
      userMock.isEmailVerified = true;
      userRepositoryMock.findOneOrFail.mockResolvedValue(userMock);

      const result = await service.findRegisteredUserOrThrow(userMock.email);

      expect(userRepositoryMock.findOneOrFail).toHaveBeenCalledWith({
        where: { email: userMock.email },
        relations: { authMethod: true, role: true },
      });
      expect(result).toBe(userMock);
    });

    it("should throw UserAuthenticationFailedException if invalid credentials", async () => {
      userRepositoryMock.findOneOrFail.mockRejectedValue(new UserAuthenticationFailedException());
      await expect(service.findRegisteredUserOrThrow(userMock.email)).rejects.toThrow(
        UserAuthenticationFailedException,
      );
      expect(userRepositoryMock.findOneOrFail).toHaveBeenCalledWith({
        where: { email: userMock.email },
        relations: { authMethod: true, role: true },
      });
    });

    it("should throw UserInactiveException if user.isActive have false value", async () => {
      userMock.email = "example@mail.com";
      userMock.isActive = false;
      userMock.isEmailVerified = true;
      userRepositoryMock.findOneOrFail.mockResolvedValue(userMock);

      await expect(service.findRegisteredUserOrThrow(userMock.email)).rejects.toThrow(UserInactiveException);
      expect(userRepositoryMock.findOneOrFail).toHaveBeenCalledWith({
        where: { email: userMock.email },
        relations: { authMethod: true, role: true },
      });
    });

    it("should throw UserEmailNotVerifiedException if user.isEmailVerified have false value", async () => {
      userMock.email = "example@mail.com";
      userMock.isActive = true;
      userMock.isEmailVerified = false;
      userRepositoryMock.findOneOrFail.mockResolvedValue(userMock);

      await expect(service.findRegisteredUserOrThrow(userMock.email)).rejects.toThrow(UserEmailNotVerifiedException);
      expect(userRepositoryMock.findOneOrFail).toHaveBeenCalledWith({
        where: { email: userMock.email },
        relations: { authMethod: true, role: true },
      });
    });

    it("should ue entityManager if provided", async () => {
      const entityManagerMock = getFreshEntityManagerMock();

      userMock.email = "example@mail.com";
      userMock.isActive = true;
      userMock.isEmailVerified = true;
      entityManagerMock.getRepository.mockReturnValue(userRepositoryMock);
      userRepositoryMock.findOneOrFail.mockResolvedValue(userMock);

      const result = await service.findRegisteredUserOrThrow(userMock.email, entityManagerMock);

      expect(userRepositoryMock.findOneOrFail).toHaveBeenCalledWith({
        where: { email: userMock.email },
        relations: { authMethod: true, role: true },
      });
      expect(result).toBe(userMock);
    });
  });
});
