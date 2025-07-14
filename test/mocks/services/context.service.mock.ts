import { mock, mockDeep } from "jest-mock-extended";
import { ContextService } from "src/shared/modules/global/context/context.service";
import { UserAgent } from "src/utils/ua";

export const getFreshContextServiceMock = () => {
  const service = mock<ContextService>();

  service.getUserAgent.mockReturnValue(mockDeep<UserAgent>());
  return service;
};
