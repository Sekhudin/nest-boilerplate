import "src/config/magic-link.config.ts";

declare module "src/config/magic-link.config.ts" {
  interface MagicLinkOptions {
    frontendUrl: string;
    verifyEmailPath: string;
    resetPasswordPath: string;
  }
}
