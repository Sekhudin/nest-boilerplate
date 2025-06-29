import "otp";
import OTP from "otp";

declare module "otp" {
  type OtpOptions = ConstructorParameters<typeof OTP>[0];
}
