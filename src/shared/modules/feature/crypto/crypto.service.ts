import crypto from "crypto";
import argon from "argon2";
import { Injectable } from "@nestjs/common";
import { cryptoConfig } from "src/config/crypto.config";

@Injectable()
export class CryptoService {
  async hashPassword(plain: string): Promise<string> {
    return await argon.hash(plain, cryptoConfig.hashOptions);
  }

  async verifyPassword(plain: string, hash: string): Promise<boolean> {
    return await argon.verify(hash, plain, { secret: cryptoConfig.hashOptions.secret });
  }

  encrypt(plain: string): string {
    const { algo, key } = cryptoConfig.encryptionOptions;
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algo, key, iv);
    const encrypted = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
  }

  decrypt(encrypted: string): string {
    const { algo, key } = cryptoConfig.encryptionOptions;
    const [ivHex, encryptedHex] = encrypted.split(":");
    if (!ivHex || !encryptedHex) throw new Error("Invalid encrypted format");

    const iv = Buffer.from(ivHex, "hex");
    const encryptedBuffer = Buffer.from(encryptedHex, "hex");
    const decipher = crypto.createDecipheriv(algo, key, iv);
    const decrypted = Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);
    return decrypted.toString("utf8");
  }
}
