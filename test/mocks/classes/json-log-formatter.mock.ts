import { mock } from "jest-mock-extended";
import { JsonLogFormatter } from "src/shared/classes/json-log-formatter";

export const getFreshJsonLogFormatterMock = () => {
  const classMock = mock<typeof JsonLogFormatter>();
  return classMock;
};
