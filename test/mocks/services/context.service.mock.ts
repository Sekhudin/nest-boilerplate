import { mock } from "jest-mock-extended";
import { ContextService } from "src/shared/modules/global/context/context.service";

export const getFreshContextServiceMock = () => {
  const service = mock<ContextService>();
  return service;
};
