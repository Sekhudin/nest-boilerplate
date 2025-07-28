import "argon2";
import { Options } from "argon2";

declare module "argon2" {
  interface HashPasswordOptions extends Options {}

  interface HashOtpOptions extends Options {}

  interface HashAuthTokenOptions extends Options {}
}
