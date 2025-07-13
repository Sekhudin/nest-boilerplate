import { mock, mockDeep } from "jest-mock-extended";
import { GeneratedOtp } from "otplib";
import { Otp } from "src/modules/otp/entities/otp.entity";
import { OtpService } from "src/modules/otp/otp.service";

export const getFreshOtpServiceMock = () => {
  const service = mock<OtpService>();

  service.sendOtpForLocalSignup.mockResolvedValue(mockDeep<GeneratedOtp>());
  service.verify.mockResolvedValue(mockDeep<Otp>());
  service.verifyLink.mockResolvedValue(mockDeep<Otp>());
  return service;
};
