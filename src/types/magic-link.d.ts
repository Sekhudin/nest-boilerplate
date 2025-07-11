import "src/config/magic-link.config";
import "src/shared/modules/global/magic-link/magic-link.service";

declare module "src/config/magic-link.config" {
  interface MagicLinkOptions {
    frontendUrl: string;
    verifyEmailPath: string;
    resetPasswordPath: string;
  }
}

declare module "src/shared/modules/global/magic-link/magic-link.service" {
  interface GenerateLinkPayload {
    token: string;
    purpose: string;
  }
}
