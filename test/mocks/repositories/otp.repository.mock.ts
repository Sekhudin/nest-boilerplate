import { DeepPartial } from "typeorm";
import { mock } from "jest-mock-extended";
import { Otp } from "src/modules/otp/entities/otp.entity";
import { OtpRepository } from "src/modules/otp/otp.repository";

export const getFreshOtpRepositoryMock = () => {
  const repository = mock<OtpRepository>();

  repository.save.mockImplementation(async <T extends DeepPartial<Otp>>(entity: T | T[]) => {
    return entity;
  });
  return repository;
};
