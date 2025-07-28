import { EncryptionOptions } from "crypto";
import argon, { HashAuthTokenOptions, HashOtpOptions, HashPasswordOptions } from "argon2";
import { BaseConfig } from "./base.config";

class CryptoConfig extends BaseConfig {
  constructor() {
    super();
  }

  get encryptionOptions(): EncryptionOptions {
    return {
      algorithm: this.env.ENCRYPTION_ALGO,
      key: this.env.ENCRYPTION_KEY,
    };
  }

  get hashPasswordOptions(): HashPasswordOptions {
    return {
      salt: Buffer.from(this.env.HASH_PASSWORD_SALT),
      secret: Buffer.from(this.env.HASH_PASSWORD_SALT),
      type: argon.argon2id,
    };
  }

  get hashOtpOptions(): HashOtpOptions {
    return {
      salt: Buffer.from(this.env.HASH_OTP_SALT),
      secret: Buffer.from(this.env.HASH_OTP_SALT),
      type: argon.argon2id,
    };
  }

  get hashAuthTokenOptions(): HashAuthTokenOptions {
    return {
      salt: Buffer.from(this.env.HASH_OTP_SALT),
      secret: Buffer.from(this.env.HASH_OTP_SALT),
      type: argon.argon2id,
    };
  }
}

export const cryptoConfig = CryptoConfig.getInstance();
