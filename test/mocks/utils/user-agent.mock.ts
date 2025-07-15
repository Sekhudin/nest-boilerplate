import { mock } from "jest-mock-extended";
import { UserAgent } from "src/utils/ua";

export const getFreshUserAgentMock = () => {
  const userAgent = mock<UserAgent>();
  return userAgent;
};
