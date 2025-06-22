import argon, { Options } from "argon2";
import { BaseConfig } from "./base.config";

class CryptoConfig extends BaseConfig {
  constructor() {
    super();
  }

  get encryptionOptions() {
    return {
      algo: this.env.ENCRYPTION_ALGO,
      key: this.env.ENCRYPTION_KEY,
    };
  }

  get hashOptions(): Options {
    return {
      salt: Buffer.from(this.env.HASH_SALT),
      secret: Buffer.from(this.env.HASH_SECRET),
      type: argon.argon2id,
    };
  }
}

export const cryptoConfig = CryptoConfig.getInstance();
