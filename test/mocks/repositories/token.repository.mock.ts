import { mock } from "jest-mock-extended";
import { TokenRepository } from "src/modules/token/token.repository";

export const getFreshTokenRepositoryMock = () => {
  const repository = mock<TokenRepository>();
  return repository;
};
