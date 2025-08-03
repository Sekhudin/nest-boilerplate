import { MockConfig } from "jest-mock-extended";
import { magicLinkConfig } from "src/config/magic-link.config";

type MagicLinkConfig = MockConfig<typeof magicLinkConfig>;
export const getFreshMagicLinkConfigMock = () => {
  const config: MagicLinkConfig = {
    environment: "test",
    isProduction: false,
    OPTIONS_INJECTOR_KEY: "INJECT:MAGIC_LINK_OPTIONS",
    magicLinkOptions: {
      frontendUrl: "http://fe.com",
      resetPasswordPath: "",
      verifyEmailPath: "/verify",
    },
    setup(app) {},
  };
  return config;
};
