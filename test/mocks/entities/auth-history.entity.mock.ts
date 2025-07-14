import { mockDeep } from "jest-mock-extended/lib/Mock";
import { AuthHistory } from "src/modules/auth/entities/auth-history.entity";

export const getFreshAuthHistoryMock = () => {
  const entity = mockDeep<AuthHistory>();
  return entity;
};
