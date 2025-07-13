import { DeepPartial } from "typeorm";
import { mock } from "jest-mock-extended";
import { Token } from "src/modules/token/entities/token.entity";
import { TokenRepository } from "src/modules/token/token.repository";

export const getFreshTokenRepositoryMock = () => {
  const repository = mock<TokenRepository>();
  repository.save.mockImplementation(async <T extends DeepPartial<Token>>(entity: T | T[]) => {
    return entity;
  });
  return repository;
};
