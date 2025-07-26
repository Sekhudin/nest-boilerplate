import { mockDeep } from "jest-mock-extended";
import { OtpDto } from "src/modules/otp/dto/responses/otp.dto";

export const getFreshOtpDtoMock = () => {
  const dto = mockDeep<OtpDto>();
  return dto;
};
