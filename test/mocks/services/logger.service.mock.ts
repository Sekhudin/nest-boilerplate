import { mockDeep } from "jest-mock-extended";
import { LoggerService } from "src/shared/modules/global/logger/logger.service";

export const getFreshLoggerServiceMock = () => {
  const service = mockDeep<LoggerService>();
  return service;
};
