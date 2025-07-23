import { mock } from "jest-mock-extended";
import { MagicLinkService } from "src/shared/modules/global/magic-link/magic-link.service";

export const getFreshMagicLinkServiceMock = () => {
  const service = mock<MagicLinkService>();
  return service;
};
