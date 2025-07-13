import { mock } from "jest-mock-extended";
import { AuthHistoryService } from "src/modules/auth/services/auth-history.service";

export const getFreshAuthHistoryServiceMock = () => {
  const service = mock<AuthHistoryService>();
  return service;
};
