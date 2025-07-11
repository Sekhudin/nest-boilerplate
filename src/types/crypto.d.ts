import "crypto";

declare module "crypto" {
  interface EncryptionOptions {
    algorithm: string;
    key: string;
  }
}
