import { mock } from "jest-mock-extended";
import { ArgumentsHost } from "@nestjs/common";

export const getFreshArgumentHostMock = () => {
  const argument = mock<ArgumentsHost>();
  return argument;
};
