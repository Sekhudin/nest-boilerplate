import "src/config/crypto.config";
import { Options } from "argon2";

declare module "src/config/crypto.config" {
  interface EncryptionOptions {
    algorithm: string;
    key: string;
  }

  interface HashPasswordOptions extends Options {}

  interface HashOtpOptions extends Options {}
}
