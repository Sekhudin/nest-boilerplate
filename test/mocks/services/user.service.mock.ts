import { mock } from "jest-mock-extended";
import { UserService } from "src/modules/user/user.service";

export const getFreshUserServiceMock = () => {
  const service = mock<UserService>();
  return service;
};
