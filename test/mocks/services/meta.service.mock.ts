import { mock } from "jest-mock-extended";
import { MetaService } from "src/shared/modules/global/meta/meta.service";

export const getFreshMetaServiceMock = () => {
  const service = mock<MetaService>();
  return service;
};
