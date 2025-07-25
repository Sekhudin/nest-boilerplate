import { mockDeep } from "jest-mock-extended";
import { AsyncStorageService } from "src/shared/modules/global/context/async-storage.service";

export const getFreshAsyncStorageServiceMock = () => {
  const service = mockDeep<AsyncStorageService>();
  return service;
};
