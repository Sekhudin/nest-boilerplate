import { mock, mockDeep } from "jest-mock-extended";
import { User } from "src/modules/user/entities/user.entity";
import { UserService } from "src/modules/user/user.service";

export const getFreshUserServiceMock = () => {
  const service = mock<UserService>();

  service.createLocalUser.mockResolvedValue(mockDeep<User>());
  return service;
};
