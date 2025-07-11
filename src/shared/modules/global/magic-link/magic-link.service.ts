import { Inject, Injectable } from "@nestjs/common";
import { magicLinkConfig, MagicLinkOptions } from "src/config/magic-link.config";

@Injectable()
export class MagicLinkService {
  constructor(@Inject(magicLinkConfig.OPTIONS_INJECTOR_KEY) private readonly options: MagicLinkOptions) {}

  generateEmailVerificationLink<T extends GenerateLinkPayload>(payload: T) {
    const link = new URL(this.options.verifyEmailPath, this.options.frontendUrl);
    link.searchParams.set("token", payload.token);
    link.searchParams.set("purpose", payload.purpose);
    return link.toString();
  }
}
