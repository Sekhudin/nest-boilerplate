import { mockDeep } from "jest-mock-extended";
import { HttpAdapterHost } from "@nestjs/core";

export const getFreshHttpAdapterHostMock = () => {
  const adapter = mockDeep<HttpAdapterHost>();
  return adapter;
};
