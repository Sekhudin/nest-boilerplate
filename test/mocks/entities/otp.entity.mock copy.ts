import { mockDeep } from "jest-mock-extended";
import { Otp } from "src/modules/otp/entities/otp.entity";

export const getFreshOtpMock = () => {
  const entity = mockDeep<Otp>();
  return entity;
};
