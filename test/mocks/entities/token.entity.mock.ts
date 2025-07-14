import { mockDeep } from "jest-mock-extended";
import { Token } from "src/modules/token/entities/token.entity";

export const getFreshTokenMock = () => {
  const entity = mockDeep<Token>();
  return entity;
};
