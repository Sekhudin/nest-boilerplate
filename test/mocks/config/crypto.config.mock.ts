import { randomString } from "zod/dist/types/v4/core/util";
import { MockConfig } from "jest-mock-extended";
import { cryptoConfig } from "src/config/crypto.config";

type CryptoConfig = MockConfig<typeof cryptoConfig>;
export const getFreshCryptoConfigMock = () => {
  const config: CryptoConfig = {
    environment: "test",
    isProduction: false,
    encryptionOptions: { algorithm: "aes-256-cbc", key: randomString(32) },
    hashAuthTokenOptions: {},
    hashOtpOptions: {},
    hashPasswordOptions: {},
    setup(app) {},
  };
  return config;
};
