import { mock } from "jest-mock-extended";
import { OtpRepository } from "src/modules/otp/otp.repository";

export const getFreshOtpRepositoryMock = () => {
  const repository = mock<OtpRepository>();
  return repository;
};
