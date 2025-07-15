import { mock } from "jest-mock-extended";
import { GeneratedOtp } from "otplib";

export const getFreshGeneratedOtpMock = () => {
  const generatedOtp = mock<GeneratedOtp>();
  return generatedOtp;
};
